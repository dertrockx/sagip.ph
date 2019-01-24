import { User } from '@models';
import * as Distress from '../distress/controller';

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

          if (user) {
            await Distress.addDistress(user.id, payload.data);
          }
          break;
      }
    }
  } catch (err) {
    console.log(message);
  }
}

export default parseSMS;
