import { User } from '@models';
import * as Distress from '../distress/controller';
import { Sms } from '@util';

import events from '../../events';

enum intent {
  DISTRESS = 'DISTRESS',
}

export const parseSMS = async (sender: string, message: string, connections: object) => {
  try {
    // @TODO: Encrypt data
    // const buffer = Buffer.from(message, 'base64').toString();
    const payload = JSON.parse(message);

    if (typeof payload === 'object') {
      switch (payload.intent) {
        case intent.DISTRESS:
          const user = await User.findOne({ phoneNumber: sender });

          if (user && user.name) {
            await Distress.addDistress(user.id, payload.data);

            const sms = new Sms();
            await sms.send(
              `Hello there, ${user.name}! We have received a distress notification from you. Your details will be disseminated to nearby users. Further comments from your alert will be sent via SMS.\n\nKeep safe!`,
              user.phoneNumber,
              user.accessToken,
            );

            // Broadcast to sockets
            for (const { socket, data } of Object.values(connections)) {
              if (data) {
                const distress = await Distress.getDistressWithData(data);
                socket.emit(events.UPDATE_DISTRESS, JSON.stringify({ distress }));
              }
            }
          }
          break;
      }
    }
  } catch (err) {
    console.log(message);
  }
}

export default parseSMS;
