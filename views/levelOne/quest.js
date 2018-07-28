const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 800, // Canvas width in pixels
    height: 600, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    scene: {
      preload: preload,
      create: create,
      update: update
    },

    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 } // Top down game, so no gravity
        }
    }
  };
  
  const game = new Phaser.Game(config);
  let player;
  
  function preload() {
        this.load.image("tiles", "../assets/sprites/scenery/roguelikeSheet_transparent.png")
        this.load.tilemapTiledJSON("map", "../assets/sprites/map/level1.json")
    }
  
  function create() {
    const tileset = map.addTilesetImage("roguelikeSheet_transparent.png", "tiles");

    const baseLayer = map.createStaticLayer("Base Color", tileset, 0, 0);
    const belowLayer = map.createStaticLayer("BelowPlayer", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({collides: true});

    player = this.physics.add.sprite(400, 350, "atlas", "misa-front");
  }
  
  function update(time, delta) {
    // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(100);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
player.body.velocity.normalize().scale(speed);
  }

  function setup() {
    // ...
  
    // This will watch the player and worldLayer every frame to check for collisions
    this.physics.add.collider(player, worldLayer);
  }