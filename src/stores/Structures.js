const Structures = [
    {
        structure_name: 'Spawning Pit',
        constructable: true,
        constructing_count: 0,
        brood_count: 1,
        hp: 20,
        atk: 0,
        biomass_cost: 20,
        synapse_produced: 0, 
        description: 'A large pit dug into the ground that gets filled with Biomass for creating Aliens.',
        special_features: 'Can build Worker Drones'
    },
    {
        structure_name: 'Synapse Cluster',
        constructable: true,
        constructing_count: 0,
        brood_count: 1,
        hp: 10,
        atk: 0,
        biomass_cost: 5,
        synapse_produced: 5, 
        description: "Sack o' brains.",
        special_features: 'Produces Synapse'
    }
];

export default Structures;