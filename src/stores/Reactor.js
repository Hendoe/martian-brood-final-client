export const Reactor = { 
  total_spawning_count: 0,
  total_constructing_count: 0,
};

export const Page = {
  page: 1,
};

export const ReactionsSpawning = (spawnCount) => {
  Reactor.total_spawning_count = spawnCount;
};

export const ReactionsConstructing = (constructCount) => {
  Reactor.total_constructing_count = constructCount;
};

export const TurnPage = (newPage) => {
  console.log('getting ready', newPage)
  console.log('checking', Page.page)
  Page.page = newPage;
  console.log('turning', Page.page)
};