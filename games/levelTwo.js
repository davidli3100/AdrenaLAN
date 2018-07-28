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
var showDebug = false;

function preload ()
{
    this.load.image("tiles", "/sprites/scenery/roguelikeSheet_transparent.png");
    this.load.tilemapTiledJSON("map", "/sprites/map/level2.json");
    this.load.image('dot', '/sprites/characters/reddot.png');
    this.load.image('gold', '/sprites/characters/gold.png');

}


function create() {
    const map       = this.make.tilemap({ key: "map" }),
          tileset   = map.addTilesetImage("background", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("belowPlayer", tileset, 0, 0),
          worldLayer = map.createStaticLayer("World", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    gold = this.physics.add.staticGroup();
    gold.create(230, 310, 'gold');

    player = this.physics.add.sprite(12, 24, 'dot');
    player.setCollideWorldBounds(true);

    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, worldLayer);

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(player, gold, collectGold, null, this);

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

function collectGold(player, gold) {
  gold.disableBody(true, true);
  window.location.replace("/paywallOne");
}

