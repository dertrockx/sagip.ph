import { types } from 'mobx-state-tree';

export const User = types.model('User', {
  id: types.number,
  name: types.string,
  phoneNumber: types.string,
});

export const Auth = types
  .model('Auth', {
    user: types.maybeNull(User)
  })
  .actions(self => ({
    updateUser(user) {
      self.user = user ? User.create(user) : null;
    }
  }));

export const store = Auth.create();
export default Auth;

