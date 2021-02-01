Martian Brood Final Client

Published 10/16/2020

Updated 10/25/2020

Link to Deployment: https://vercel.com/hendoe/martian-brood-final-client

This is part of Steven Henderson's 2-Week Capstone-1 Project for the staff at Thinkful and their Engineering Program.

## Table of contents
[General Information](#general-info)

[Technical](#technical)

[Stretch Goals](#stretch-goals)

## General Information
Martian Brood is a Text Based Game made in React. It allows players to manage the growth of a brood of aliens on Mars. The player must ensure that their brood has adequate biomass to "spawn" additional aliens, as well as providing enough synapse. Without these resources the player won't be able to grow out their brood!

The current version of the game is an iteration which has just the core "gameplay systems" in a working state. As the game is focused on creating new aliens contigent on sufficient resource supplies, the fundamental pillars of the experience are both the "Alien Spawner" and the "Structure Constructer" React Components. There functionality is very similar, so the Alien Spawner's blueprint was then copied over to the Structure Constructer, with slight modifications. From these components, the appropriate values must be rendered on the "Alien List" component as well as it's sibling component, the "Structure List". When the player is happy with their choices, they can finalize their creation plans and send a request to end their turn to the server. Finally, the game server responds with an updated "Status Report" of the current players brood, and thus ends the primary gameplay loop.

## Technical
Currently there are 4 Routes. The Main Screen displays on startup, or at endpoint '/'. From there, a player can click on Quickplay to start a game. The Gameplay Route is where almost everything happens. Nearly every Component is part of the Gameplay Route. The App uses Context to supply data regarding the current state of the player's Brood. This context contains all the functions needed for updating itself, as well as passing on some other Functions to the Gameplay Route. For the most part, Context is accessed only when it needs to be modified. This would be primarily for any of the PATCH requests at end of turn. There are also a few instances when Context must also be looked at, for example to supply the relevant lists with data concerning the amount of Aliens or Structures in the Brood.

Conditionals are used to render the appropriate screens as needed. All of the clicks that handle the changing of Conditionals generate a string. This string is then passed along to the Gameplay Route where it will be sent to the Conditional Store for changing the Condition. For example, if the game needs to pull up the Reactions Component, then the string will simply be 'reactions'. Once the string reaches the Conditional Store it will know what to do with it.

The most complicated thing here is keeping track of all the data being shifted around, modified, and played with. Most functions exist to faciliate the transfer of data. When a player clicks on a builder it brings up a screen that allows them to adjust how many of a given item they want to create as well as the associated Biomass and Synpase costs that come along with it. This information is temporarily stored on the Client and used to keep the lists current. Once the player is satisfied with their Building Decisions this information is then compared with the Player's Current Resources, then it updates that data, and finally the new Status is PATCHED to the Server. By doing this we reduce the overall amount of data being stored on the Server so we can focus on having a robust React App that does the majority of the work, and it keeps the server relatively simple.

## Stretch Goals
1- Add validation for Biomass and Synapse

2- Add Gathering functionality

3- Work in the Story Component

4- Create functions and serverside Endpoints for both the 'Continue' and 'Create' Routes

5- Add in the 'Brood Master' Alien
