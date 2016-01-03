# Bunny Wars
  
  A bunny killing things in the space.
  
## Build
  
### Prerequisites

  * node.js >= 5
  * make 4.x

### Instructions

This project uses `make` as primary buildtool. 
All project dependencies as well as build dependencies are installed under `node_modules` (and therefore specified in `package.json`.

#### `make [build]`
  Will build the project under `./dst` ready for release.
 
### `make dev`
  Will build the project for development and set up a static http server to test it.
  Refer to the output of the command to know how to access to the server.
  
### Project structure

All development files are under `src` folder. This folder has its own sub-structure organizing files according to its type and
and semantic in this project (ie. All typescripts files are under `./src/typescripts` and typescripts describing entities under `./src/typescripts/entities`).
This folder must only contain files that would be modified. All external dependencies must need to be controlled by an external tool or script.

The only file outside a subfolder is `index.html` which is the only one of its kind.


  
