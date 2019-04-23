import openSocket from 'socket.io-client';

const socket = openSocket(
  process.env.NODE_ENV === 'production'
  ? 'https://api.sagip.ph'
  : 'http://localhost:8081'
);

const events = {
  DISTRESS_WATCH: 'DISTRESS_WATCH',
  UPDATE_DISTRESS: 'UPDATE_DISTRESS',
  DETACH_WATCH: 'DETACH_WATCH',
}

export const subscribe = ({ long, lat, distance, age }) => {
  socket.emit(events.DISTRESS_WATCH, JSON.stringify({ long, lat, distance, age }));
}

export const unsubscribe = () => {
  socket.emit(events.DETACH_WATCH);
}

export const attachListener = callback => {
  socket.on(events.UPDATE_DISTRESS, payload => {
    callback(JSON.parse(payload).distress);
  });
}

export default socket;
