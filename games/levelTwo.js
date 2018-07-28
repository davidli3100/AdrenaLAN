var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
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
    }
};

const game = new Phaser.Game(config);
var cursors;
var player;
var coin;
var count = 0;

function preload ()
{
    this.load.image("tiles", "/sprites/scenery/roguelikeSheet_transparent.png");
    this.load.tilemapTiledJSON("map", "/sprites/map/level2.json");
    this.load.image('dot', '/sprites/characters/reddot.png');
    this.load.spritesheet('coin', '/sprites/characters/coin_spritesheet.png', {frameWidth: 14, frameHeight: 14});

}


function create() {
    const map       = this.make.tilemap({ key: "map" }),
          tileset   = map.addTilesetImage("background", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("belowPlayer", tileset, 0, 0),
          worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    coins = this.physics.add.group();

    coin1 = this.physics.add.sprite(230, 310, 'coin');
    coin2 = this.physics.add.sprite(24, 260, 'coin');
    coin3 = this.physics.add.sprite(311, 144, 'coin');

    coins.add(coin1);
    coins.add(coin2);
    coins.add(coin3);
    

    player = this.physics.add.sprite(12, 24, 'dot');
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
}

    
function update () {
  if (cursors.left.isDown){
      player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
      player.setVelocityX(160);
  } else if (cursors.up.isDown) {
      player.setVelocityY(-160);
  } else if (cursors.down.isDown) {
      player.setVelocityY(160);
  }
}

function collectGold(player, coin) {
  count += 1;
  coin.disableBody(true, true);
  if (count === 3) {
    window.location.replace("/paywallTwo");
  }
}

