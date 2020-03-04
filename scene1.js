class Scene1 extends Phaser.Scene{
  constructor() {
    super("Scene1")
  }


preload(){}
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE
create(){
  	//////////////////////////////////////////////////////////////////////////////// keyboard
  	this.input.keyboard.on('keydown_ONE',pylons_activation);
  	cursors = this.input.keyboard.createCursorKeys();
  ////////////////////////////////////////////////////////////////////////////////  music
  	this.music = this.sound.add('valbit');
  	/*this.musicConfig = {
  		mute: false,
  		volume: 0.1,
  		rate: 1,
  		detune: 0,
  		seek: 0,
  		loop: true,
  		delay: 0
  	}
  	this.music.play(musicConfig);
  	this.input.addDownCallback(function() {
  		if (game.sound.context.state === 'suspended') {
  			game.sound.context.resume();
  		}
  	});*/
  	//////////////////////////////////////////////////////////////////////////////// timers
  	timer_dps = this.time.addEvent({ delay: 925, callback: damageCristal, loop: true });
  	timer = this.time.addEvent({ delay: 1000, callback: spawn_spectre, loop: true });
  	timer_carte = this.time.addEvent({ delay: 5000, callback: spawn_carte, loop: true });
  //////////////////////////////////////////////////////////////////////////////// décors
  	this.add.image(400,300,'background1');
  	this.add.image(400,500,'background2');
  	this.add.image(400,300,'background3');
  //////////////////////////////////////////////////////////////////////////////// plateforme
  	platforms = this.physics.add.staticGroup();
  	platforms.create(400,588,'sol');
  	platforms.create(400,14,'top');
  	platforms.create(60,408,'bloc1');
  	platforms.create(738,408,'bloc1');
  	platforms.create(402,263,'bloc2');
  	this.add.image(400,568,'sursol').setScale(0.7);
  	this.add.image(300,42,'surtop').setScale(0.7);
  	this.add.image(402,303,'surbloc2').setScale(0.5);
  //////////////////////////////////////////////////////////////////////////////// pylon
  	pylons = this.physics.add.staticGroup();
  	//pylons.create( 81, 336, 'pylon');
  	pylons.create( 81, 530, 'pylon');
  	//pylons.create( 711, 336, 'pylon');
  	pylons.create( 711, 530, 'pylon');
    dmgpylonanims = this.physics.add.staticGroup();
    dmgpylonanims.create( 51, 526, 'dmgpylon');
    dmgpylonanims.create( 111, 526, 'dmgpylon');
    dmgpylonanims.create( 681, 526, 'dmgpylon');
    dmgpylonanims.create( 741, 526, 'dmgpylon');
  //////////////////////////////////////////////////////////////////////////////// cristal
  	text_pvcristal = this.add.text(362, 325, '1000', {fontSize: '32px', fill:'#FFF'});
  	cristal = this.physics.add.sprite(400,443,'cristal');
  	cristal.body.setGravityY(-300);
  	this.anims.create({
  		key:'cristal_turn',
  		frames: this.anims.generateFrameNumbers('cristal', {start: 0, end: 3}),
  		frameRate: 8,
  		repeat: -1
  	});
  	cristal.anims.play('cristal_turn', true);
  //////////////////////////////////////////////////////////////////////////////// cartes
  	cartes = this.physics.add.staticGroup();
  	cartes.create( 400, 180, 'carte', false, false);
  	cartes.create( 38, 73,'carte_1', false, false);
  	cartes.create( 82, 73,'carte_2', false, false);
  	cartes.create( 126, 73,'carte_3', false, false);
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
  	slash_on = false;
  ///////////////////////////////////////////////////////////////////////////////// étoiles
  	/*stars = this.physics.add.group({
  		key: 'etoile',
  		repeat:11,
  		setXY: {x:12,y:0,stepX:70}
  	});*/
  	//this.physics.add.collider(stars,platforms);
  	//this.physics.add.overlap(player,stars,collectStar,null,this);
  //////////////////////////////////////////////////////////////////////////////// score
  	text_score = this.add.text(590,46, 'score:0', {fontSize: '32px', fill:'#FFF'});
  //////////////////////////////////////////////////////////////////////////////// bombes
  	//bombs = this.physics.add.group();
  	//this.physics.add.collider(bombs,platforms);
  	//this.physics.add.collider(player,bombs, hitBomb, null, this);
  //////////////////////////////////////////////////////////////////////////////// spectres
  	spectres = this.physics.add.group();
  	this.physics.add.collider(spectres, platforms);
  	this.physics.add.overlap(spectres, cristal, contactCristal);
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
  	this.anims.create({
  		key:'spectre_death',
  		frames: this.anims.generateFrameNumbers('spectre', {start: 13, end: 17}),
  		frameRate: 10,
  		repeat: 0
  	});
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE END

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  UPDATE
update(){
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
  }//double jump end
  //////////////////////////////////////////////////////////////////////////////// spectre
  spectre_near_cristal(spectres);
  //////////////////////////////////////////////////////////////////////////////// game over
  if (pv_cristal<=0){
  	for (i = 0; i < spectres.children.entries.length; i++){
  		spectres.children.entries[i].anims.stop();
  		spectres.children.entries[i].anims.play('spectre_death');
  		spectres.remove(spectres.children.entries[i]);
  	}
  	this.physics.pause();
  	player.setTint(0xff0000);
  	timer_dps.paused = true;
  	timer.paused = true;
  }
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE END
}
