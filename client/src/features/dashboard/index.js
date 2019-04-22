import { types } from 'mobx-state-tree';

// import * as Api from 'api';
import * as AsyncState from 'features/states';

const Status = types.model('DashboardStatus', {
  radius: AsyncState.SUCCESS,
  distress: AsyncState.PENDING,

  isRadiusOpen: false,
  isDistressOpen: false,
  isLocationBlocked: false,
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
    activeDistress: types.frozen(),
    status: Status,
  })
  .actions(self => ({
    updateLocation({ lat, lng }) {
      self.location = Location.create({ lat, lng, updated: true });
    },
    toggleRadiusModal() {
      self.status.isRadiusOpen = !self.status.isRadiusOpen;
    },
    toggleDistressModal() {
      self.status.isDistressOpen = !self.status.isDistressOpen;
    },
    changeRadius(radius) {
      self.radius = +radius;
    },
    changeActiveDistress(distress) {
      self.activeDistress = distress;
    },
    setLocationTrackingBlocked() {
      self.status.isLocationBlocked = true;
    },
  }));

export const store = Dashboard.create({
  location: {
    lat: 0,
    lng: 0
  },
  radius: 10000,
  activeDistress: null,
  status: Status.create(),
});
export default Dashboard;

