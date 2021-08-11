import Phaser, { Scene } from 'phaser';
import Player from './player';

class Game extends Scene {
  public player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;

  constructor() {
    super({
      key: 'Game'
    });

    this.player = null;
  }

  public preload(): void {
    const imgPath = '/assets/img/';

    this.load.image('sky', `${imgPath}sky.png`);
    this.load.image('ground', `${imgPath}platform.png`);
    this.load.image('star', `${imgPath}star.png`);
    this.load.image('bomb', `${imgPath}bomb.png`);
    this.load.spritesheet('dude', `${imgPath}dude.png`, {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  public create(): void {
    const star = () => {
      const it = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });

      it.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
    };

    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    const player = new Player(this);

    const playerBody = player.create();

    this.physics.add.collider(playerBody, platforms);

    this.player = playerBody;

    star();
  }

  public update(): void {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player?.setVelocityX(-160);

      this.player?.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player?.setVelocityX(160);

      this.player?.anims.play('right', true);
    } else {
      this.player?.setVelocityX(0);

      this.player?.anims.play('turn');
    }

    if (cursors.up.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default Game;
