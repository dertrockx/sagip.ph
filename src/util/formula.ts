const EARTH_RADIUS_IN_KM = 6371;

export const sphericalLawOfCosines = (long: number, lat: number): string => `
  (
    ${EARTH_RADIUS_IN_KM} *
    ACOS(
      SIN(RADIANS(${lat})) *
      SIN(RADIANS(distress.latitude))
      +
      COS(RADIANS(${lat})) *
      COS(RADIANS(distress.latitude)) *
      COS(RADIANS(distress.longitude) - RADIANS(${long}))
    )
  )
`;
