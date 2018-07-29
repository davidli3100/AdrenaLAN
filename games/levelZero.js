const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 640, // Canvas width in pixels
    height: 640, // Canvas height in pixels // ID of the DOM element to add the canvas to
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
  var player;
  var cursors;
  
  function preload() {
        this.load.image("tiles", "/sprites/scenery/roguelikeSheet_transparent_2x.png")
        this.load.tilemapTiledJSON("map", "/sprites/map/level1.json")
        //Loading atlas
        this.load.atlas("atlas", "/sprites/characters/atlas.png", "/sprites/characters/atlas.json");
    }
  
  function create() {
    const map       = this.make.tilemap({ key: "map" }),
          tileset   = map.addTilesetImage("background", "tiles");

    const baseLayer = map.createStaticLayer("BaseColor", tileset, 0, 0);
    const belowLayer = map.createStaticLayer("BelowPlayer", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("AbovePlayer", tileset, 0, 0);

    worldLayer.setCollisionByProperty({collides: true});

    player = this.physics.add.sprite(320, 580, "atlas", "misa-front");
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, worldLayer);

    const anims = this.anims;
          anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
          });
          anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
          });
          anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
          });
          anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
          });

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();
  }
  
    function update(time, delta) {
          const speed = 175;
          const prevVelocity = player.body.velocity.clone();

          // Stop any previous movement from the last frame
          player.body.setVelocity(0);

          // Horizontal movement
          if (cursors.left.isDown) {
            player.body.setVelocityX(-speed);
          } else if (cursors.right.isDown) {
            player.body.setVelocityX(speed);
          }

          // Vertical movement
          if (cursors.up.isDown) {
            player.body.setVelocityY(-speed);
          } else if (cursors.down.isDown) {
            player.body.setVelocityY(speed);
            }

          // Normalize and scale the velocity so that player can't move faster along a diagonal
          player.body.velocity.normalize().scale(speed);
    
          // Normalize and scale the velocity so that player can't move faster along a diagonal
          player.body.velocity.normalize().scale(speed);

          // Update the animation last and give left/right animations precedence over up/down animations
          if (cursors.left.isDown) {
            player.anims.play("misa-left-walk", true);
          } else if (cursors.right.isDown) {
            player.anims.play("misa-right-walk", true);
          } else if (cursors.up.isDown) {
            player.anims.play("misa-back-walk", true);
          } else if (cursors.down.isDown) {
            player.anims.play("misa-front-walk", true);
          } else {
            player.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
  }
}
