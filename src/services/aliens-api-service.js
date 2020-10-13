//import TokenService from '../services/token-service';
import config from '../config';
import { SetStatus } from '../storesAPI/Status';

// const AliensApiService = {
//   getAliens() {
//     return fetch(`${config.API_ENDPOINT}/aliens`, {
//       headers: {
//       },
//     })
//       .then(res =>
//         (!res.ok)
//           ? res.json().then(event => Promise.reject(event))
//           :res.json()
//       )
//   },
//   getAlien(alienId) {
//     return fetch(`${config.API_ENDPOINT}/aliens/${alienId}`, {
//       headers: {
//         //'authorization': `bearer ${TohenService.getAuthToken()}`,
//       },
//     })
//       .then(res =>
//         (!res.ok)
//           ? res.json().then(event => Promise.reject(event))
//           :res.json()
//       )
//   }
// };

// export default AliensApiService

// ALL OTHERS

// //GAMEPLAY
  //GETS IT
  // export const GETmaster = () => {
  //   Promise.all([
  //     fetch(`${config.API_ENDPOINT}/status`)
  //   ])
  //     .then(([statusRes]) => {
  //       if (!statusRes.ok)
  //         return statusRes.json().then(event => Promise.reject(event))
  //       return Promise.all([
  //         statusRes.json(),
  //       ])
  //     })
  //     .then((status) => {
  //       SetStatus( status )
  //     })
  //     .catch(error => {
  //       console.log({error})
  //     })

    // Promise.all([
    //   fetch(`${config.API_ENDPOINT}/aliens`)
    // ])
    //   .then(([aliensRes]) => {
    //     if (!aliensRes.ok)
    //       return aliensRes.json().then(event => Promise.reject(event))
    //     return Promise.all([
    //       aliensRes.json(),
    //     ])
    //   })
    //   .then(([aliens]) => {
    //     this.setState({ aliens })
    //   })
    //   .catch(error => {
    //     console.log({error})
    //   })

    // Promise.all([
    //   fetch(`${config.API_ENDPOINT}/structures`)
    // ])
    //   .then(([structuresRes]) => {
    //     if (!structuresRes.ok)
    //       return structuresRes.json().then(event => Promise.reject(event))
    //     return Promise.all([
    //       structuresRes.json(),
    //     ])
    //   })
    //   .then(([structures]) => {
    //     this.setState({ structures })
    //   })
    //   .catch(error => {
    //     console.log({error})
    //   })
  //};


// // REACTIONS
  // componentWillUnmount() {
  //   this.POSTmaster();
  // };

  // POSTmaster() {
  //   this.commitStatus();
  //   this.commitAliens();
  //   this.commitStructures();
  // };

  // commitAliens() {
  //   const { aliens } = this.props
  //   aliens.map( newAliens => (
  //     fetch(config.API_ENDPOINT + `/commit/aliens`, {
  //       method: 'PATCH',
  //       body: JSON.stringify(newAliens),
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     })
  //     .then(res => {
  //       if (!res.ok)
  //         return res.json().then(error => Promise.reject(error))
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  //   ))
  // };

  // commitStructures() {
  //   console.log('final structures', this.props.structures)
  //   const { structures } = this.props
  //   structures.map( newStructures => (
  //     fetch(config.API_ENDPOINT + `/commit/structures`, {
  //       method: 'PATCH',
  //       body: JSON.stringify(newStructures),
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     })
  //     .then(res => {
  //       if (!res.ok)
  //         return res.json().then(error => Promise.reject(error))
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  //   ));
  // };