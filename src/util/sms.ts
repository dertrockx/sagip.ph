import axios from 'axios';

export class Sms {
  private senderAddress: string;
  private url: string;

  constructor() {
    this.senderAddress = '5186';
    this.url = `https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${this.senderAddress}/requests?access_token=`;
  }

  public send = (content: string, address: string, access_token: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(this.url + access_token, {
          outboundSMSMessageRequest: {
            senderAddress: this.senderAddress,
            outboundSMSTextMessage: { message: content },
            address
          }
        });

        return resolve(data);
      } catch (err) {
        console.log(err);
        console.log(err.message);
        return reject();
      }
    });
  }
}

export default Sms;
