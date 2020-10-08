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
    updateToSpawn(event) {
        const power = event.target.val();
        let spawning = (Aliens.toSpawn + parseInt(power));
        Aliens.setState({toSpawn: spawning});
    },
};

export default Spawner;