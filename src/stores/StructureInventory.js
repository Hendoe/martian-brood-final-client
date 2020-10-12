import { ReactionsConstructing } from './Reactor';

export const StructureInventory = [
    {
      id: 1,
      structure_name: 'Spawning Pit',
      constructable: true,
      constructing_count: 0,
      brood_count: 1,
    },
    {
      id: 2,
      structure_name: 'Synapse Cluster',
      constructable: true,
      constructing_count: 0,
      brood_count: 1,
    },
  ];

export const UpdateConstructing = (x, i) => {
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

  export const FinalConstructing = () => {
    let constructCount = 0;
      for (let i = 0; i < StructureInventory.length; i++) {
        let count = StructureInventory[i].constructing_count;
        StructureInventory[i].brood_count += count;
        StructureInventory[i].constructing_count = 0;
        constructCount += count;
        };
    ReactionsConstructing(constructCount);
    resetOrders();
  };

  function resetOrders(i) {
    for (let i = 0; i < StructureInventory.length; i++) {
      StructureInventory[i].constructing_count = 0;
    };
  };