export const Reactor = { 
  total_spawning_count: 0,
  total_constructing_count: 0,
};

export const Story = {
  day1: 'Awakening from the Ice',
  day2: 'The Drones hatch',
  day3: 'asdfklasdkfdsf',
  day4: 'kasdjfkldjasfljdas',
  day5: 'asdfasdter'
};

export const ReactionsSpawning = (spawnCount) => {
  Reactor.total_spawning_count = spawnCount;
};

export const ReactionsConstructing = (constructCount) => {
  Reactor.total_constructing_count = constructCount;
};