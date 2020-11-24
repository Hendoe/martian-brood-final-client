export const Conditionals = { 
    disableButtons: true,
    storyMode: false,
    spawnMode: false,
    constructMode: false,
    taskMode: false,
    reactionMode: false,
    loadMode: true,
};

export const ChangeConditions = (changing) => {
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
    Conditionals.loadMode = false;
  } else if (changing === 'loading') {
    Conditionals.disableButtons = true;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    Conditionals.taskMode = false;
    Conditionals.reactionMode = false;
    Conditionals.loadMode = true;
  } else if (changing === 'cancel') {
    Conditionals.disableButtons = false;
    Conditionals.storyMode = false;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    //taskMode
    Conditionals.reactionMode = false;
    Conditionals.loadMode = false;
  } else if (changing === 'cancelTasks') {
    Conditionals.disableButtons = false;
    Conditionals.spawnMode = false;
    Conditionals.constructMode = false;
    Conditionals.taskMode = false;
    Conditionals.reactionMode = false;
    Conditionals.loadMode = false;
  } else {
    alert('check your conditionals');
  };
};