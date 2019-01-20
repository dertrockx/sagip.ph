import * as express from 'express';
import { getRepository } from 'typeorm';

import { Distress } from '../';
import { throwError, sphericalLawOfCosines } from '../../util';

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

export const getDistress = async (req, res): Promise<express.Response> => {
  try {
    let { long, lat, distance } = req.query;
    [long, lat, distance] = [long, lat, distance].map(parseFloat);

    if (long && lat && distance) {
      const distress = await getRepository(Distress)
        .createQueryBuilder('distress')
        .select([
          'id',
          'nature',
          'timestamp',
          'description',
          'longitude',
          'latitude'
        ])
        .addSelect(sphericalLawOfCosines(long, lat), 'distance')
        .having('distance <= :distance', { distance })
        .getRawMany();

      return res.json({ distress, count: distress.length });
    }

    return throwError(res, null, { error: 'No specified longitude and latitude' }, 400);
  } catch (err) {
    return throwError(res, err);
  }
}
