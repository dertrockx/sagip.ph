import { types, flow } from 'mobx-state-tree';
import { User } from 'features/login';

import * as Api from 'api';
import * as AsyncState from 'features/states';

const Status = types.model('DistressStatus', {
  distress: AsyncState.PENDING,
});

const Map = types
  .model('Map', {
    distress: types.array(types.frozen()),
    status: Status,
  })
  .actions(self => ({
    fetchDistress: flow(function* fetchDistress({ lat, lng, radius }) {
      self.status.distress = AsyncState.PENDING;
      self.distress = [];

      try {
        const { data } = yield Api.getAllDistress({ lat, long: lng, distance: radius });
        self.distress = data.distress;
        self.status.distress = AsyncState.SUCCESS;
      } catch (err) {
        self.status.distress = AsyncState.ERROR;
      }
    })
  }))

export const store = Map.create({
  distress: [],
  status: Status.create(),
});
export default Map;

