Martian Brood Final Client

Published 10/16/2020

Link to Deployment: https://vercel.com/hendoe/martian-brood-final-client

This is part of Steven Henderson's 2-Week Capstone-1 Project for the staff at Thinkful and their Engineering Program.

## Table of contents
*[General Information](#general-info)
*[Technical](#technical)
*[Stretch Goals](#stretch-goals)

## General Information
Martian Brood is a Text Based Game made in React. It allows players to manage the growth of a brood of aliens on Mars. The player must ensure that their brood has adequate biomass to "spawn" additional aliens, as well as providing enough synapse. Without these resources the player won't be able to grow out their brood!

The current version of the game is an iteration which has just the core "gameplay systems" in a working state. As the game is focused on creating new aliens contigent on sufficient resource supplies, the fundamental pillars of the experience are both the "Alien Spawner" and the "Structure Constructer" React Components. There functionality is very similar, so the Alien Spawner's blueprint was then copied over to the Structure Constructer, with slight modifications. From these components, the appropriate values must be rendered on the "Alien List" component as well as it's sibling component, the "Structure List". When the player is happy with their choices, they can finalize their creation plans and send a request to end their turn to the server. Finally, the game server responds with an updated "Status Report" of the current players brood, and thus ends the primary gameplay loop.

## Technical





*The Gather Biomass button, Synapse Resource, and No Biomass Features are disabled for this version.

For this deployment, the game is set to be purely client based. It will reset entirely on a screen refresh. All the connections to the server are, however, intact, and can be placed back into action where they should work fine so long as the server is not undergoing maintenance.