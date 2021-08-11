import Phaser from 'phaser';
import game from './game';

type configType = Phaser.Types.Core.GameConfig;

const config: configType = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [game]
};

// new Player(new game());
const jogo = new Phaser.Game(config);
