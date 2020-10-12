import Structures from '../local-stores/Aliens';
import Status from '../local-stores/Status';

const Constructor = {
    updateTotalBiomass() {
        let oldBiomass = Status.biomass;
        const newBiomass = oldBiomass - (Structures.biomass_cost * Structures.construct_count);
        Status.setState({biomass: newBiomass});
        Structures.setState({toConstruct: 0});
    },
    // updateConstructCount = (event) => {
    //     const power = event.val();
    //     let oldCount = Structures.spawn_count;
    //     const newCount = oldCount + power;
    //     Status.setState({count: newCount});
    //     this.setState({toBuild: 0});
    // };
    updateToConstruct(event) {
        const power = event.val();
        let constructing = (Structures.toConstruct + parseInt(power));
        Structures.setState({toConstruct: constructing});
    },
};

export default Constructor;