import { types } from 'mobx-state-tree';

const Location = types.model('Location', {
  lng: types.number,
  lat: types.number,
  updated: false,
});

const Dashboard = types
  .model('Dashboard', {
    location: Location,
    radius: types.number,
  })
  .actions(self => ({
    updateLocation({ lat, lng }) {
      self.location = Location.create({ lat, lng, updated: true });
    }
  }));

export const store = Dashboard.create({
  location: {
    lat: 0,
    lng: 0
  },
  radius: 1000,
});
export default Dashboard;

