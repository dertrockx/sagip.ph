import { types } from 'mobx-state-tree';

// import * as Api from 'api';
import * as AsyncState from 'features/states';

const Status = types.model('DashboardStatus', {
  radius: AsyncState.SUCCESS,

  isRadiusOpen: false,
});

const Location = types.model('Location', {
  lng: types.number,
  lat: types.number,
  updated: false,
});

const Dashboard = types
  .model('Dashboard', {
    location: Location,
    radius: types.number,
    status: Status,
  })
  .actions(self => ({
    updateLocation({ lat, lng }) {
      self.location = Location.create({ lat, lng, updated: true });
    },
    toggleRadiusModal() {
      self.status.isRadiusOpen = !self.status.isRadiusOpen;
    },
    changeRadius(radius) {
      self.radius = +radius;
    }
  }));

export const store = Dashboard.create({
  location: {
    lat: 0,
    lng: 0
  },
  radius: 1000,
  status: Status.create(),
});
export default Dashboard;

