var config = {
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
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;
var dispo_jj = 0;
var released = 0;

function init(){
 	var platforms;
	var player;
	var cursors;
	var stars;
	var scoreText;
	var bomb;
}

function preload(){
	this.load.image('background1','assets/background_color.png');
	this.load.image('background2','assets/background.png');
	this.load.image('background3','assets/walls_background.png');
	this.load.spritesheet('etoile','assets/diamond.png',{frameWidth: 18, frameHeight: 14});
	this.load.image('sol','assets/bloc_bot.png');
	this.load.image('top','assets/bloc_top.png');
	this.load.image('bloc1','assets/bloc_large.png');
	this.load.image('bloc2','assets/bloc_small.png');
	this.load.image('sursol','assets/herb_bloc_bot.png');
	this.load.image('surtop','assets/herb_bloc_top.png');
	this.load.image('surbloc1','assets/herb_bloc_large.png');
	this.load.image('surbloc2','assets/herb_bloc_small.png');
	this.load.image('bomb','assets/bomb_off.png');
	this.load.spritesheet('perso','assets/tsofy.png',{frameWidth: 54, frameHeight: 40});
}



function create(){
	this.add.image(400,300,'background1');
	this.add.image(400,500,'background2');
	this.add.image(400,300,'background3');

	platforms = this.physics.add.staticGroup();
	platforms.create(400,588,'sol');
	platforms.create(60,408,'bloc1');
	platforms.create(738,408,'bloc1');
	platforms.create(402,263,'bloc2');
	this.add.image(400,568,'sursol').setScale(0.5);



	player = this.physics.add.sprite(70,80,'perso').setSize(17,40).setOffset(18,0).setScale(1.5);
	player.setCollideWorldBounds(true);
	player.setBounce(0.05);
	player.body.setGravityY(2300);
	this.physics.add.collider(player,platforms);

	cursors = this.input.keyboard.createCursorKeys();

	this.anims.create({
		key:'right',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 7}),
		frameRate: 12,
		repeat: -1
	});

	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 8, end: 13}),
		frameRate: 4,
		repeat: -1
	});

	this.anims.create({
		key:'jump',
		frames: this.anims.generateFrameNumbers('perso', {start: 14, end: 14}),
		frameRate: 1,
		repeat: -1
	});
	this.anims.create({
		key:'down',
		frames: this.anims.generateFrameNumbers('perso', {start: 15, end: 15}),
		frameRate: 1,
		repeat: -1
	});

	stars = this.physics.add.group({
		key: 'etoile',
		repeat:11,
		setXY: {x:12,y:0,stepX:70}
	});
	/*this.anims.create({
		key:'shine',
		frames: this.anims.generateFrameNumbers('etoile', {start: 0, end: 2}),
		frameRate: 10,
		repeat: 1
	});*/
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);

	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#FFF'});

	bombs = this.physics.add.group();
	this.physics.add.collider(bombs,platforms);
	this.physics.add.collider(player,bombs, hitBomb, null, this);
}



function update(){
	//stars.anims.play('shine', true);


	if(cursors.left.isDown && player.body.touching.down){
		player.anims.play('right', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
	}else if(cursors.right.isDown && player.body.touching.down){
		player.setVelocityX(300);
		player.anims.play('right', true);
		player.setFlipX(false);
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}

	if(cursors.left.isDown && !player.body.touching.down){
		player.setVelocityX(-300);
		player.setFlipX(true);
	}else if(cursors.right.isDown && !player.body.touching.down){
		player.setVelocityX(300);
		player.setFlipX(false);
	}


	if(player.body.touching.down){ dispo_jj=0;}

	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-1100);
	}

	if(cursors.up.isUp && dispo_jj==0 && !player.body.touching.down){ dispo_jj = 1;}

	if(cursors.up.isDown && dispo_jj==1 && !player.body.touching.down){
		player.setVelocityY(-1100);
		dispo_jj = 2;
	}


	if(player.body.velocity.y<=0 && !player.body.touching.down){
		player.anims.play('jump', true);
	}
	else if(player.body.velocity.y>0 && !player.body.touching.down){
		player.anims.play('down', true);
	}
}


function hitBomb(player, bomb){
	this.physics.pause();
	player.setTint(0xff0000);
	gameOver=true;
}

function collectStar(player, star){
	star.disableBody(true,true);
	score += 10;
	scoreText.setText('score: '+score);
	if(stars.countActive(true)===0){
		stars.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});

		var x = (player.x < 400) ?
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}
}
