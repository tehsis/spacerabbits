# Game States

[Game states](./imgs/states.png)

## Boot

Loads initial configuration.

UI: Not needed.

## Preloader

Loads assets and initializes subsystems (sockets, server, ...)

UI: A Progress bar or loading indicator.

## Main Menu

Allows the player to select an action.

UI: Menu displaying all possible actions.

## My record

The player can see its biggest score and share it.

UI: Displays scores, share button. Back to menu button.

## Login

Identifies the user.

UI: A Login/register box when the user is not identified. A loading indicator when the user is identified.

## Scores

Displays the top (5?) users scores.

UI: Scores lists, back button.

## Game

Main Game.

UI: A pause button, the effing game.

## Pause

Pause the game, allows to share the player current score.

UI: a button for sharing, resume game and back to main menu.

## Game Over

Allows the player to share its last game score, play again or back to main menu.

UI: Button for play again, back to main menu and share.