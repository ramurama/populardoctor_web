import Endpoints from '../../../redux/actions/endpoints'

export const sendPushMessage = (title, body, callback) => {
  fetch(Endpoints.sendAnnouncement, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ title, body })
  }).then(res => callback(res.status));
};
