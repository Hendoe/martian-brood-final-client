import config from '../config';

// export const StatusApiService = {
//   GETmaster() {
//     console.log('getting everything');
//     Promise.all([
//       fetch(`${config.API_ENDPOINT}/status`),
//       fetch(`${config.API_ENDPOINT}/aliens`),
//       fetch(`${config.API_ENDPOINT}/structures`)
//     ])
//       .then(([statusRes, aliensRes, structuresRes]) => {
//         if (!statusRes.ok)
//           return statusRes.json().then(e => Promise.reject(e))
//         if (!aliensRes.ok)
//           return aliensRes.json().then(e => Promise.reject(e))
//         if (!structuresRes.ok)
//           return structuresRes.json().then(e => Promise.reject(e))

//         return Promise.all([
//           statusRes.json(),
//           aliensRes.json(),
//           structuresRes.json()
//         ])
//       })
//       .then(([status, aliens, structures]) => {
//         ReportContext.setStatus(status)
//         ReportContext.setAliens(aliens)
//         ReportContext.setStructures(structures)
//       })
//       .catch(error => {
//         console.error({ error })
//       })
//   }
// };
export const StatusApiService = {
  getStatus() {
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
  getAliens() {
    return fetch(`${config.API_ENDPOINT}/aliens`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAlienInventory() {
    return fetch(`${config.API_ENDPOINT}/alienInventory`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getStructures() {
    return fetch(`${config.API_ENDPOINT}/structures`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getStructureInventory() {
    return fetch(`${config.API_ENDPOINT}/structureInventory`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
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
};