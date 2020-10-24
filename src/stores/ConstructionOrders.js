export const StructureInventory = [
    {
      id: 1,
      structure_name: 'Spawning Pit',
      constructing_count: 0,
      brood_count: 1,
    },
    {
      id: 2,
      structure_name: 'Synapse Cluster',
      constructing_count: 0,
      brood_count: 1,
    },
  ];

export const UpdateConstructionOrders = (x, i) => {
    let constructCount = StructureInventory[i].constructing_count;
    if (x === 1) {
      let newCount = (constructCount += 1);
      StructureInventory[i].constructing_count = newCount;
    } else if (x === 0) {
      let newCount = (constructCount -= 1);
      StructureInventory[i].constructing_count = newCount;
    } else {
      alert("constructing broke'd");
    };
  };