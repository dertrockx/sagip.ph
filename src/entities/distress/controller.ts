import * as express from 'express';
import { getRepository } from 'typeorm';

import { Distress } from '../';
import { throwError, sphericalLawOfCosines } from '../../util';

export const addDistress = (user, { nature, long, lat, description }): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // @TODO: Throttle distress requests.

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
      let distress = await getRepository(Distress)
        .createQueryBuilder('distress')
        .leftJoin('distress.user', 'user')
        .select([
          'distress.id',
          'nature',
          'distress.timestamp',
          'description',
          'longitude',
          'latitude',

          'user.id',
          'name',
          'phoneNumber'
        ])
        .addSelect(sphericalLawOfCosines(long, lat), 'distance')
        .where('distress.isActive = TRUE')
        .having('distance <= :distance', { distance })
        .getRawMany();

      distress = distress.map(distress => {
        const {
          distress_id,
          distress_timestamp,
          user_id,
          nature,
          description,
          longitude,
          latitude,
          name,
          phoneNumber,
          distance
        } = distress;

        return {
          id: distress_id,
          timestamp: distress_timestamp,
          nature,
          description,
          longitude,
          latitude,
          distance,
          user: {
            id: user_id,
            name,
            phoneNumber,
          }
        };
      });

      return res.json({ distress, count: distress.length });
    }

    return throwError(res, null, { error: 'No specified longitude and latitude' }, 400);
  } catch (err) {
    return throwError(res, err);
  }
}

export const getDistressById = async (req, res): Promise<express.Response> => {
  const { long, lat } = req.query;
  const { distressId } = req.params;

  try {
    let distress: any[] | any = getRepository(Distress)
      .createQueryBuilder('distress')
      .leftJoin('distress.user', 'user')
      .select([
        'distress.id',
        'nature',
        'distress.timestamp',
        'description',
        'longitude',
        'latitude',

        'user.id',
        'name',
        'phoneNumber'
      ]);

    if (long && lat) {
      distress = distress.addSelect(sphericalLawOfCosines(long, lat), 'distance');
    }
    
    const {
      distress_id,
      distress_timestamp,
      user_id,
      nature,
      description,
      longitude,
      latitude,
      name,
      phoneNumber,
      distance
    } = await distress.where('distress.id = :distressId AND distress.isActive = TRUE', { distressId }).getRawOne();

    return res.json({
      distress: {
        id: distress_id,
        nature,
        timestamp: distress_timestamp,
        description,
        longitude,
        latitude,
        distance,
        user: {
          id: user_id,
          name,
          phoneNumber,
        }
      }
    });
  } catch (err) {
    return throwError(res, err);
  }
}

export const resolveDistress = async (req, res): Promise<express.Response> => {
  const { distressId } = req.params;

  try {
    const distress = await Distress.findOne(distressId);

    if (!distress) {
      return throwError(res, null, { error: 'Distress does not exist' }, 404);
    }

    distress.isActive = false;
    await distress.save();

    return res.json({ id: distress.id });
  } catch (err) {
    return throwError(res, err);
  }
}
