import { User } from '@models';
import * as Distress from '../distress/controller';
import { Sms } from '@util';

enum intent {
  DISTRESS = 'DISTRESS',
}

export const parseSMS = async (sender: string, message: string) => {
  try {
    const buffer = Buffer.from(message, 'base64').toString();
    const payload = JSON.parse(buffer);

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
          }
          break;
      }
    }
  } catch (err) {
    console.log(message);
  }
}

export default parseSMS;
