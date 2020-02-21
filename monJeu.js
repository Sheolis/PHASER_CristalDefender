var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
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
var pv_cristal = 1000;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  INIT
function init(){
 	var platforms;
	var player;
	var cursors;
	var stars;
	var text_score;
	var text_pvcristal
	var bomb;
	var spectre;
	var timer;
	var slash_on;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRELOAD
function preload(){
	this.load.image('background1','assets/background_color.png');
	this.load.image('background2','assets/background.png');
	this.load.image('background3','assets/walls_background.png');
	this.load.image('sol','assets/bloc_bot.png');
	this.load.image('top','assets/bloc_top.png');
	this.load.image('bloc1','assets/bloc_large.png');
	this.load.image('bloc2','assets/bloc_small.png');
	this.load.image('sursol','assets/herb_bloc_bot.png');
	this.load.image('surtop','assets/herb_bloc_top.png');
	this.load.image('surbloc1','assets/herb_bloc_large.png');
	this.load.image('surbloc2','assets/herb_bloc_small.png');
	this.load.spritesheet('perso','assets/sofy92.png',{frameWidth: 112, frameHeight: 95});
	this.load.spritesheet('cristal','assets/cristal.png',{frameWidth: 73, frameHeight: 168});
	this.load.spritesheet('spectre','assets/spectre164x130.png',{frameWidth: 130, frameHeight: 164});
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE
function create(){
	//this.input.keyboard.on('keydown_SPACE',space_down);

	slash_on = false;
	timer = this.time.addEvent({ delay: 1000, callback: spawn_spectre, loop: true });
	cursors = this.input.keyboard.createCursorKeys();
//////////////////////////////////////////////////////////////////////////////// décors
	this.add.image(400,300,'background1');
	this.add.image(400,500,'background2');
	this.add.image(400,300,'background3');
//////////////////////////////////////////////////////////////////////////////// plateforme
	platforms = this.physics.add.staticGroup();
	platforms.create(400,588,'sol');
	platforms.create(60,408,'bloc1');
	platforms.create(738,408,'bloc1');
	platforms.create(402,263,'bloc2');
	this.add.image(400,568,'sursol').setScale(0.5);
//////////////////////////////////////////////////////////////////////////////// cristal
	cristal = this.physics.add.sprite(400,443,'cristal');
	cristal.body.setGravityY(-300);
	this.anims.create({
		key:'cristal_turn',
		frames: this.anims.generateFrameNumbers('cristal', {start: 0, end: 3}),
		frameRate: 8,
		repeat: -1
	});
	cristal.anims.play('cristal_turn', true);
//////////////////////////////////////////////////////////////////////////////// player
	player = this.physics.add.sprite(70,80,'perso').setSize(40,86).setOffset(33,8);
	//.setScale(1.5);
	player.setCollideWorldBounds(true);
	player.setBounce(0.05);
	player.body.setGravityY(2300);
	this.physics.add.collider(player,platforms);
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
	this.anims.create({
		key:'slash',
		frames: this.anims.generateFrameNumbers('perso', {start: 17, end: 19}),
		frameRate: 10,
		repeat: -1
	});
	this.anims.create({
		key:'spectre_walk',
		frames: this.anims.generateFrameNumbers('spectre', {start: 0, end: 3}),
		frameRate: 6,
		repeat: -1
	});
	this.anims.create({
		key:'spectre_hit',
		frames: this.anims.generateFrameNumbers('spectre', {start: 4, end: 12}),
		frameRate: 10,
		repeat: -1
	});
///////////////////////////////////////////////////////////////////////////////// étoiles
	/*stars = this.physics.add.group({
		key: 'etoile',
		repeat:11,
		setXY: {x:12,y:0,stepX:70}
	});*/
	//this.physics.add.collider(stars,platforms);
	//this.physics.add.overlap(player,stars,collectStar,null,this);
//////////////////////////////////////////////////////////////////////////////// score
	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#FFF'});
//////////////////////////////////////////////////////////////////////////////// bombes
	//bombs = this.physics.add.group();
	//this.physics.add.collider(bombs,platforms);
	//this.physics.add.collider(player,bombs, hitBomb, null, this);
//////////////////////////////////////////////////////////////////////////////// spectres
	spectres = this.physics.add.group();
	this.physics.add.collider(spectres, platforms);
	this.physics.add.overlap(spectres, cristal, damagecristal);

}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE END

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  UPDATE
function update(){
//////////////////////////////////////////////////////////////////////////////// cristal
//////////////////////////////////////////////////////////////////////////////// player
if(cursors.space.isDown){slash_on=true;}
if(slash_on) {
	player.anims.play('slash',true);
	att_spectre();
	if(player.anims.currentFrame.index==player.anims.currentAnim.frames.length){slash_on=false;}
}
else{
	if(player.body.touching.down){ dispo_jj=0;}

	if(cursors.left.isDown && player.body.touching.down){
		player.anims.play('right', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
	}else if(cursors.right.isDown && player.body.touching.down){
		player.setVelocityX(300);
		player.anims.play('right', true);
		player.setFlipX(false);
	}
	else{
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
//double jump

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
}
//double jump end
//////////////////////////////////////////////////////////////////////////////// spectre

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE END

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTIONS

/*function hitBomb(player, bomb){
	this.physics.pause();
	player.setTint(0xff0000);
	gameOver=true;
}*/



/*function collectStar(player, star){
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
*/
