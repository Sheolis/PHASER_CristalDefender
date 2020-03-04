class Menu extends Phaser.Scene{
  constructor() {
    super("Menu")
  }

init(){

  score = 0;
  dispo_jj = 0;
  released = 0;
  pv_cristal = 1000;
  dps_cristal = 0;
  spawn_spot=[[10,302],[10,498],[792, 302],[792, 498]];
  carte_dispo= 0;
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRELOAD
preload(){
  this.load.audio('valbit', ['assets/audio/valbit.it', 'assets/audio/valbit.ogg']);
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
  this.load.image('pylon','assets/pylon.png');
  this.load.image('carte','assets/carte.png');
  this.load.image('carte_1','assets/carte_1.png');
  this.load.image('carte_2','assets/carte_2.png');
  this.load.image('carte_3','assets/carte_3.png');
  this.load.spritesheet('perso','assets/sofy92.png',{frameWidth: 112, frameHeight: 95});
  this.load.spritesheet('cristal','assets/cristal.png',{frameWidth: 73, frameHeight: 168});
  this.load.spritesheet('spectre','assets/spectre164x130.png',{frameWidth: 130, frameHeight: 164});
  this.load.spritesheet('dmgpylon','assets/dmgspylon.png',{frameWidth: 100, frameHeight: 100});
}//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE

create(){
  cursors = this.input.keyboard.createCursorKeys();
  this.add.image(400,300,'background1');
  this.add.image(400,500,'background2');
  this.add.image(400,300,'background3');
}

update(){
  if (cursors.space.isDown) {
    this.scene.start("Scene1" ,{});
  }
}

}
