const EARTH_RADIUS_IN_KM = 6371;

export const sphericalLawOfCosines = (long: number, lat: number): string => `
  (
    ${EARTH_RADIUS_IN_KM} *
    ACOS(
      SIN(RADIANS(${long})) *
      SIN(RADIANS(distress.latitude))
      +
      COS(RADIANS(${long})) *
      COS(RADIANS(distress.latitude)) *
      COS(RADIANS(distress.longitude) - RADIANS(${lat}))
    )
  )
`;
