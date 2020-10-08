import Aliens from '../local-stores/Aliens';
import Status from '../local-stores/Status';

const Spawner = {
    updateTotalBiomass() {
        let oldBiomass = Status.biomass;
        const newBiomass = oldBiomass - (Aliens.biomass_cost * Aliens.plan_count);
        Status.setState({biomass: newBiomass});
        Aliens.setState({toSpawn: 0});
    },

    updateSpawnCount(event) {
        const power = event.target.val();
        let oldCount = Aliens.plan_count;
        const newCount = oldCount + power;
        Status.setState({count: newCount});
        this.setState({toBuild: 0});
    },

    subtractToSpawn() {
        let spawning = Aliens.toSpawn;
        if (spawning === 0) {
            alert('You cannot spawn less than 0 aliens')
        } else {
            spawning -= 1;
        };
        this.props.Aliens.updateToSpawn(spawning);
    },
};

export default Spawner;