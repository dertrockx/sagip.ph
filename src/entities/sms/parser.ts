export const parseSMS = (message: string): void => {
  try {
    const buffer = Buffer.from(message, 'base64').toString();
    const payload = JSON.parse(buffer);

    if (typeof payload === 'object') {
      console.log(payload);
    }
  } catch (err) {
    console.log(message);
  }
}

export default parseSMS;
