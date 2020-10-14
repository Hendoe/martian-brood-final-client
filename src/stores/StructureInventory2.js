import { ReactionsConstructing } from './Reactor';

export const StructureInventory2 = [
    {
      id: 1,
      structure_name: 'Herku',
      constructable: true,
      constructing_count: 0,
      brood_count: 1,
    },
    {
      id: 2,
      structure_name: 'Weerble',
      constructable: true,
      constructing_count: 0,
      brood_count: 1,
    },
  ];

export const UpdateConstructing = (x, i) => {
    let constructCount = StructureInventory2[i].constructing_count;
    if (x === 1) {
      let newCount = (constructCount += 1);
      StructureInventory2[i].constructing_count = newCount;
    } else if (x === 0) {
      let newCount = (constructCount -= 1);
      StructureInventory2[i].constructing_count = newCount;
    } else {
      alert("constructing broke'd");
    };
  };

  export const FinalConstructing = () => {
    let constructCount = 0;
      for (let i = 0; i < StructureInventory2.length; i++) {
        let count = StructureInventory2[i].constructing_count;
        StructureInventory2[i].brood_count += count;
        StructureInventory2[i].constructing_count = 0;
        constructCount += count;
        };
    ReactionsConstructing(constructCount);
    resetOrders();
  };

  function resetOrders(i) {
    for (let i = 0; i < StructureInventory2.length; i++) {
      StructureInventory2[i].constructing_count = 0;
    };
  };