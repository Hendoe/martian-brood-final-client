Martian Brood MVP

Published 10/12/2020

Link to Deployment: https://vercel.com/hendoe/martian-brood-mvp/9exc6icqd

Martian Brood is a Text Based Game made in React. It allows players to manage the growth of a brood of aliens on Mars. The player must ensure that their brood has
adequate biomass to "spawn" additional aliens, as well as providing enough synapse. Because if they don't the aliens will leave their brood!

This is part of Steven Henderson's 2-Week Capstone-1 Project for the staff at Thinkful and their Engineering Program. 

Martian Brood MVP is an iteration of the game which has just the core "gameplay systems" in a working state. As the game is focused on creating new aliens contigent on sufficient resource supplies, the fundamental pillars of the experience are both the "Alien Spawner" and the "Structure Constructer" React Components. Functionally, the Alien Spawner is set to only deal with a single object. It's blueprint was then copied to the Structure Constructer, but with a slight modification. The Structure Constructor deals with arrays instead of one object. From there, the appropriate values must be rendered on the "Alien List" component as well as it's sibling component, the "Structure List". When the player is happy with their choices, they can finalize their creation plans and send a request to end their turn to the server. Finally, the game server responds with an updated "Status Report" of the current players brood, and thus ends the primary gameplay loop.

*The Gather Biomass button, Synapse Resource, and No Biomass Features are disabled for this version. As well as a few additional bugs.

For this deployment, the game is set to be purely client based. It will reset entirely on a screen refresh. All the connections to the server are, however, intact, and can be placed back into action where they should work fine so long as the server is not undergoing maintenance.