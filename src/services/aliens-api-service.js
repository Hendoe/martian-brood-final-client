//import TokenService from '../services/token-service';
import config from '../config';

const AliensApiService = {
  getAliens() {
    return fetch(`${config.API_ENDPOINT}/aliens`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          :res.json()
      )
  },
  getAlien(alienId) {
    return fetch(`${config.API_ENDPOINT}/aliens/${alienId}`, {
      headers: {
        //'authorization': `bearer ${TohenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          :res.json()
      )
  }
};

export default AliensApiService