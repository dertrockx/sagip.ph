import { types, flow } from 'mobx-state-tree';

import * as Api from 'api';
import * as AsyncState from 'features/states';
import Toast from '@components/toast';

const Status = types.model('DistressStatus', {
  distress: AsyncState.PENDING,
  addComment: AsyncState.SUCCESS,
  getComment: AsyncState.PENDING,
});

const Map = types
  .model('Map', {
    distress: types.array(types.frozen()),
    comments: types.array(types.frozen()),
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
    }),
    updateDistress(distress) {
      self.distress = [...distress];
    },
    getComments: flow(function* getComments(distressId) {
      self.status.getComment = AsyncState.PENDING;
      self.comments = [];

      try {
        const { data } = yield Api.getComments(distressId);
        self.comments = data.comments;
        self.status.getComment = AsyncState.SUCCESS;
      } catch (err) {
        Toast({
          title: 'Failed to fetch comments',
          content:  err.response.data.errror,
          type: 'error'
        });
        self.status.getComment = AsyncState.ERROR;
      }
    }),
    commentToDistress: flow(function* fetchDistress(distressId, { content }) {
      self.status.addComment = AsyncState.PENDING;

      try {
        const { data } = yield Api.addCommentToDistress(distressId, { content });
        self.comments.push(data);
        self.status.addComment = AsyncState.SUCCESS;
        Toast({
          title: 'Successfully posted comment',
          content:  'Comment will be sent to the user\'s mobile',
          type: 'error'
        });
      } catch (err) {
        self.status.addComment = AsyncState.ERROR;
      }
    }),
  }))

export const store = Map.create({
  distress: [],
  status: Status.create(),
});
export default Map;

