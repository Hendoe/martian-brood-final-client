export const Reactor = { 
      total_spawning_count: 0,
      total_constructing_count: 0,
};

export const ReactionsSpawning = (spawnCount) => {
  Reactor.total_spawning_count = spawnCount;
};

export const ReactionsConstructing = (constructCount) => {
  Reactor.total_constructing_count = constructCount;
};