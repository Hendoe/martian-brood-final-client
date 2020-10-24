import React, { Component } from 'react';
import './Story.css';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  };

  turnPage = (page) => {
    this.setState({ page : page})
  };

  renderPage = () => {
    if (this.state.page === 1) {
      return (
        <section>
          <h4>2246 AD, Mars</h4>
          <p>For several hundred years, humanity has lived on Mars. All across the surface of the red planet settlements are thriving.</p>
          <p>In the early days of colonization, people had to rely on great domes to survive. Without enough oxygen on the surface it was impossible to live for long without wearing a space suit.</p>
          <p>However, seeds planted in the first days proved most fruitful, as the humans waited patiently for their day to reap what had been sown.</p>
          <p>Today's Mars is home to thriving forests and an abundance of fresh water lakes. Numerous species, bioengineered from the genes of Earth creatures, now call the Red Planet home.</p>
          <p>Although all seems well on Mars, there is trouble brewing in the still frozen Northern Expanse.</p>
          <button className='story-button' onClick={() => this.turnPage(2)}>Go on...</button>
        </section>
      );
    } else if (this.state.page === 2) {
      return (
        <section>
          <h4>The Northern Expanse, Mars</h4>
          <p>A small science team of just 8 individuals went looking for treasures in the ice. Far away from civilization, they ventured to mysterious frozen peaks, hidden from prying eyes.</p>
          <p>But instead of finding any loot, they found something quite unbelievable.</p>
          <p>Frozen solid lay a sleeping beast, black as the abyss and tall as a grizzly bear, perfectly preserved in an icy coffin.</p>
          <p>The science team decided to blast the frozen monster out of it's cavern, yet ended up blasting the cave down upon themselves.</p>
          <p>All of the scientists perished in the explosion... The alien beast, however, only found himself on the receiving end of a rather explosive wake up call.</p>
          <button className='story-button' onClick={() => this.turnPage(3)}>Very well...</button>
        </section>
      );
    } else if (this.state.page === 3) {
        return (
          <section>
            <h4>The Northern Expanse, Mars</h4>
            <p>This alien seems to be a respectful sort, for after strecthing his limbs and getting some of that bitter cold Martian air, he sets to work digging a grave.</p>
            <p>With the hole in the Mars complete, he then begins placing the fallen scientists to rest, one by one.</p>
            <p>His task complete, he then throws a few heapings of dirt onto his handiwork, then disappears into the forest for who knows what.</p>
            <p className='gold'>Your Broodmaster has just built a Spawning Pit for you.</p>
            <p className='orange'>Spawning Pits allow the Brood to spawn Worker Drones</p>
            <button className='story-button' onClick={() => this.turnPage(4)}>That was nice of him</button>
          </section>
        );
    } else if (this.state.page === 4) {
      return (
        <section>
          <h4>The Northern Expanse, Mars</h4>
          <p>Several hours later and the Broodmaster has returned. He plops down some wood from the forest and moves over to the hole in the ground where he stands gazing into the pit.</p>
          <p>Peculiar clicking noises are emanting from below. The sounds of scurrying grow louder, as the Broodmaster begins to whistle.</p>
          <p>Suddenly, two aliens crawl out of the hole. There are much smaller than the Broodmaster, and running around him in wide circles.</p>
          <p className='gold'>Your Spawning Pit has just spawned 2 Worker Drones.</p>
          <p className='orange'>Worker Drones allow the Brood to gather biomass, which is needed for creating things</p>
          <button className='story-button' onClick={() => this.turnPage(5)}>Interesting!</button>
        </section>
      );
    } else if (this.state.page === 5) {
      return (
        <section>
          <h4>The Northern Expanse, Mars</h4>
          <p>Both beasts are roaming about aimlessly, snarling at anything that moves and biting wildly.</p>
          <p>Without heeding either of them, the Broodmaster walks around to the other side of the pit, and begins to spew acid on the wood he gathered from the forest.</p>
          <p>Almost at once, the wood begins to bubble. As the hours go by it twists and turns, mutating into bizarre shapes, before finally turning into something resembling a flower, with a little pink trio of bulbs atop it.</p>
          <p className='gold'>Your Broodmaster has constucted a Synapse Cluster</p>
          <p className='orange'>Synapse Clusters produce Synapse, which is needed to coordinate your Worker Drones</p>
          <button className='story-button' onClick={() => this.turnPage(6)}>I see</button>
        </section>
      );
    } else if (this.state.page === 6) {
      return (
        <section>
          <h4>The Northern Expanse, Mars</h4>
          <p>As the bulbs of the plant blossom in the early morning sun, a change becomes obvious in the 2 Drones, who have become still as statues, a far cry from their earlier wildness.</p>
          <p>Soundlessly, the Broodmaster gestures to the Workers. They both fall in line at his sides, and follow him into the forest.</p>
          <p>Many hours pass, but eventually the three return. In their claws are stacks of wood, and in their mouths are small, furry animals. All the aliens take turns placing their findings in a pile, then they lay down to sleep.</p>
          <p className='gold'>Your Brood has gathered biomass from the forest</p>
          <p className='orange'>You now know everything you need to play Martian Brood. Good luck, Broodmaster!</p>
          <button className='story-button' onClick={() => this.props.handleClick('cancel')}>Thanks, I'm ready</button>
        </section>
      );
    };
  };

  render() {
    return(
      <div className="story-box">
        {this.renderPage()}
      </div>
    );
  };
};

export default Story;