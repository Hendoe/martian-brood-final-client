import config from '../config';

const StatusApiService = {
  getStatus() {
    console.log('getting')
    return fetch(`${config.API_ENDPOINT}/status`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
};

export default StatusApiService