export const Status = {
  state = {
    status: [],
  };
};

export const SetStatus = (status) => {
  console.log(status[0])
  let newStatus = status;
  this.setState({Status: newStatus});
};