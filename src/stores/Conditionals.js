export const Conditionals = { 
    disableButtons: false,
    spawnMode: false,
    constructMode: false,
    taskMode: false,
};

export const handleChangeCondition = (changing) => {
  if (changing === 'spawning') {
    Conditionals.disableButtons = true;
    Conditionals.spawnMode = true;
    Conditionals.constructMode = false;
  } else if (changing === 'constructing') {
    Conditionals.disableButtons = true;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = true;
  } else if (changing === 'tasks') {
    Conditionals.disableButtons = true;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    Conditionals.taskMode = true;
  } else if (changing === 'reactions') {
    Conditionals.disableButtons = true;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    Conditionals.taskMode = false;
    Conditionals.reactionMode = true;
  } else if (changing === 'cancel') {
    Conditionals.disableButtons = false;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    //taskMode
    Conditionals.reactionMode = false;
  } else if (changing === 'cancelTasks') {
    Conditionals.disableButtons = false;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    Conditionals.taskMode = false;
    Conditionals.reactionMode = false;
  } else {
    alert('check your conditionals');
  };
};
