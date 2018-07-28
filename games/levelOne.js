var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 608,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var player;
var platform;
var cursors;
var game = new Phaser.Game(config);

function preload () {
    this.load.image('sky', '/images/sky.png');
    this.load.image('ground', '/images/ground.png');
    this.load.image('flag', '/images/flag.png');
    this.load.spritesheet('girl', '/sprites/characters/girl.png', {frameWidth: 32, frameHeight: 48});
}

function create () {
	this.add.image(400, 304, 'sky');

	platform = this.physics.add.staticGroup();
	platform.create(400, 568, 'ground');
	player = this.physics.add.sprite(100, 250, 'girl');
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);
	flag = this.physics.add.staticGroup();
	flag.create(620, 424, 'flag');

	this.anims.create({
	    key: 'left',
	    frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
	    frameRate: 10,
	    repeat: -1
	});

	this.anims.create({
	    key: 'turn',
	    frames: [ { key: 'girl', frame: 4 } ],
	    frameRate: 20
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('girl', { start: 5, end: 8 }),
	    frameRate: 10,
	    repeat: -1
	});

	cursors = this.input.keyboard.createCursorKeys();

	this.physics.add.collider(player, platform);
	this.physics.add.overlap(player, flag, collectFlag, null, this);
}

function update () {
	if (cursors.left.isDown){
	    player.setVelocityX(-160);
	    player.anims.play('left', true);
	} else if (cursors.right.isDown) {
	    player.setVelocityX(160);
		player.anims.play('right', true);
	} else {
    	player.setVelocityX(0);
    	player.anims.play('turn');
	}

	if (cursors.up.isDown && player.body.touching.down) {
    	player.setVelocityY(-330);
	}
}

function collectFlag(player, flag) {
	flag.disableBody(true, true);
	var victoryMessage = document.querySelector(".victory");
	victoryMessage.style.display = "";

}