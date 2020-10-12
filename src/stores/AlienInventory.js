import { ReactionsSpawning } from './Reactor';

export const AlienInventory = [
  { 
      alien_name: 'Worker Drone',
      spawning_count: 0,
      brood_count: 0,
  },
];

export const UpdateSpawning = (x) => {
  let spawnCount = AlienInventory[0].spawning_count;
  if (x === 1) {
    let newCount = (spawnCount += 1);
    AlienInventory[0].spawning_count = newCount;
  } else if (x === 0) {
    let newCount = (spawnCount -= 1);
    AlienInventory[0].spawning_count = newCount;
  } else {
    alert("spawning broke'd");
  };
};

export const FinalSpawning = () => {
  let spawnCount = AlienInventory[0].spawning_count;
  AlienInventory[0].brood_count = spawnCount;
  ReactionsSpawning(spawnCount);
  resetSpawns();
};

function resetSpawns() {
  AlienInventory[0].spawning_count = 0;
};