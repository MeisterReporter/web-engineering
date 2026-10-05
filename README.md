# web-engineering

## Project Decision
### Available Projects
- DB Train Watcher (A 3D representation of the german DB track network. Watch your train in travel in 3D.)
- ÖPNV Empire (Build your ÖPNV Empire on a piece of land gathered from real height data. Build Networks, Buildings etc. and test other players stability by attacking their empire with passengers.)
- In Browser Smoke Simulation (Simulate smoke and fire in realtime in your browser.)
- Anyquiz (A quiz sandbox, where any quizshow [from PietSmiet] can be created and played together.)
- AI Companion Webapp (I developed a smarthome AI Agent, which fulfills tasks more intelligent than e.g. Alexa, but it lacks a Companion App for configuration. mobile access and more.)

### What Project and why?
I choose the "ÖPNV Empire". Most other projects don't fit the required criteria exactly and don't earn a lot of bonus points. While the chosen projects should fit the required criteria and earns bonus points, due to requiring a backend (using NodeJS) having 3D graphics. If a component library like shadcn/ui fits the design needs further consideration.
The name is stupid but I like it.

### Style
The UI Design will be in a pixel art style, with hand crafted icons, interfaces etc. While the overall 3D Graphics will be simple and not pixelated, but the models will be low poly and the textures will be retro.

### Goals
Since this may be a project similar to live service games, that are never fully done, we need to define what our goals are.
- Account Creation & Login Process
- Access to a hightmap API and terrain generation with dynamic Shaders/Textures
- Random City Generation at the selected Terrain
- City Expansion: Build System for Rails, Roads and Buildings
- Attack Stability Test: Different types of Passengers try to flood the city ÖPNV. Available to Test yourself and as a PvP mode.
- PvP: Uses the current saved state of a random player. Player can tap where to send passengers, which try to use the ÖPNV (Train, Bus, Airplane) and Hotels, Attractions etc. Builings and Systems have a "health" which can be different depending on the system itself (Capacity, Fun-Factor and more), if the "health" of the overall City is low enough during the Test it counts as a Defeat, else it is a Victory.
- Saving Player Data: Connect to a Database using the Backend
- Backend: Handles login, build, chooses random players to attack and saves city statistics

### Transparency
Generative AI will be used in this Project to discuss ideas, architecture as well as performance optimization and independent test writing. Also Inline code completion from GitHub Copilot may be used, if the suggested code snippets is equal or similar to what the Dev wanted to write.
