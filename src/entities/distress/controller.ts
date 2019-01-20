import { Distress } from '../';

export const addDistress = (user, { nature, long, lat, description }): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const distress = new Distress();
      Object.assign(distress, {
        nature,
        description,
        longitude: long,
        latitude: lat,
        user,
      });

      await distress.save();
      return resolve(distress);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
}
