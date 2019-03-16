import { types } from 'mobx-state-tree';

import auth, { store as authStore } from './login';
import dashboard, { store as dashboardStore } from './dashboard';
import map, { store as mapStore } from './map';

const RootStore = types.model('Root', {
  auth,
  dashboard,
  map,
});

const store = RootStore.create({
  auth: authStore,
  dashboard: dashboardStore,
  map: mapStore,
})

export default store;

