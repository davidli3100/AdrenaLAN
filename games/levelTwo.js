var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
};

const game = new Phaser.Game(config);
var cursors;
var player;
var coin;
var count = 0;
var music;
var pickup;

function preload ()
{
    this.load.image("tiles", "/sprites/scenery/roguelikeSheet_transparent_2x.png");
    this.load.tilemapTiledJSON("map", "/sprites/map/level2.json");
    this.load.image('dot', '/sprites/characters/reddot.png');
    this.load.spritesheet('coin', '/sprites/characters/coin_spritesheet.png', {frameWidth: 14, frameHeight: 14});
    this.load.audio('bgm', ['/audio/08 - Overworld.ogg']);
    this.load.audio('pickup', ['/audio/pickup.ogg']);
}


function create() {
    const map       = this.make.tilemap({ key: "map" }),
          tileset   = map.addTilesetImage("background", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("belowPlayer", tileset, 0, 0),
          worldLayer = map.createStaticLayer("World", tileset, 0, 0); 
    worldLayer.setCollisionByProperty({ collides: true });

    coins = this.physics.add.group();

    coin1 = this.physics.add.sprite(460, 620, 'coin');
    coin2 = this.physics.add.sprite(48, 520, 'coin');
    coin3 = this.physics.add.sprite(622, 288, 'coin');

    coins.add(coin1);
    coins.add(coin2);
    coins.add(coin3);
    

    player = this.physics.add.sprite(24, 48, 'dot');
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, worldLayer);

    cursors = this.input.keyboard.createCursorKeys();
    

    this.anims.create({
      key: 'coins',
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1 
      });

    coin1.anims.play('coins');
    coin2.anims.play('coins');
    coin3.anims.play('coins');

    // this.physics.add.overlap(player, coin1, collectGold, null, this);
    // this.physics.add.overlap(player, coin2, collectGold, null, this);
    // this.physics.add.overlap(player, coin3, collectGold, null, this);
    this.physics.add.overlap(player, coins, collectGold, null, this);
    music = this.sound.add('bgm', {loop: true});
	music.play();
}

    
function update () {
  if (cursors.left.isDown){
      player.setVelocityX(-300);
  } else if (cursors.right.isDown) {
      player.setVelocityX(300);
  } else if (cursors.up.isDown) {
      player.setVelocityY(-300);
  } else if (cursors.down.isDown) {
      player.setVelocityY(300);
  }
}

function collectGold(player, coin) {
  count += 1;
  coin.disableBody(true, true);
  if (count === 2) {
    iframe = window.parent.document.querySelector('iframe');
    iframe.setAttribute('src', '/paywallTwo');
    iframe.setAttribute('class', 'game-container');
  }
  pickup = this.sound.add('pickup',  {loop: false});
  pickup.play();
}

