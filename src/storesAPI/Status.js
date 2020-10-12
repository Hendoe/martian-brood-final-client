import StatusApiService from '../services/status-api-service';

export const Status = {
  status: [],
};

export const SetStatus= () => {
  console.log(StatusApiService.getStatus())
};

// export const SetStatus = (status) => {
//   console.log(status[0])
//   let newStatus = status;
//   this.setState({Status: newStatus});
// };