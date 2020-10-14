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
    console.log('getting status')
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
    console.log('getting aliens')
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
  getStructures() {
    console.log('getting structures')
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
    console.log('getting structure inventory')
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
};