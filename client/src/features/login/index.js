import { types, flow } from 'mobx-state-tree';

import * as Api from 'api';
import * as AsyncState from 'features/states';

const Status = types.model('AuthStatus', {
  login: AsyncState.SUCCESS,
  confirm: AsyncState.SUCCESS,
  session: AsyncState.PENDING,

  confirmationModalOpen: false,
});

export const User = types.model('User', {
  id: types.number,
  name: types.string,
  phoneNumber: types.string,
});

export const Auth = types
  .model('Auth', {
    user: types.maybeNull(User),
    userId: types.maybeNull(types.number),
    status: Status,
  })
  .actions(self => ({
    toggleConfirmationModal() {
      self.status.confirmationModalOpen = !self.status.confirmationModalOpen;
    },
    getSession: flow(function* getSession() {
      self.status.session = AsyncState.PENDING;

      try {
        const { data } = yield Api.getSession();

        self.status.session = AsyncState.SUCCESS;
        if (data.user) {
          self.user = User.create(data.user);
        }
      } catch (e) {
        self.status.session = AsyncState.ERROR;
      }
    }),
    login: flow(function* login({ phoneNumber }) {
      self.status.login = AsyncState.PENDING;
      self.userId = null;

      try {
        const { data } = yield Api.login({ phoneNumber });
        self.userId = data.user.id;
        self.status.login = AsyncState.SUCCESS;
        self.status.confirmationModalOpen = true;
      } catch (err) {
        self.status.login = AsyncState.ERROR;
      }
    }),
    confirmUserLogin: flow(function* confirmUser({ code }) {
      self.status.confirm = AsyncState.PENDING;

      try {
        const { data } = yield Api.confirmLogin({ code, userId: self.userId });

        self.userId = null;
        self.status.confirm = AsyncState.SUCCESS;
        self.user = User.create(data);
        self.status.confirmationModalOpen = false;
      } catch (err) {
        self.status.confirm = AsyncState.ERROR;
      }
    }),
    logout: flow(function* logout() {
      self.status.session = AsyncState.PENDING;

      try {
        yield Api.logout();
        self.user = null;
        self.status.session = AsyncState.SUCCESS;
      } catch (e) {
        self.status.session = AsyncState.ERROR;
      }
    }),
  }));

export const store = Auth.create({
  status: Status.create(),
});
export default Auth;

