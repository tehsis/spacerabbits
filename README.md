# Space Rabbits

  ![Space Rabbits Icon](/Assets/ICON@2X.png)

  Help the little rabbit to defends their planet!

## Development

1. Install dependencies: `yarn`
2. Start development server: `yarn start`

## Architecture

This game is developed as a PWA using Phaser.js.
As it can be seen in `webpack.config.js` the main entry point is located under `src/index.ts`.

The game uses Phaser's states for each scene. States are automatically picked up from './src/scripts/states/index.js`, once exported it can be reference by the object name.
  
All the assets present in the game were created by https://github.com/yohannaje