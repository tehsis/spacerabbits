export function write (game, size, x, y, font, text) {
  game.add.text(x, y, text, {
    font: 'bold 32px' + font,
    fill: '#fff'
  });
}

export function writeActionText(game, text, x, y) {
  return game.add.text(x, y, text, {
    font: 'bold 20px spacemono',
    fill: '#fff'
  }); 
}