function damagecristal(spectre, pv_cristal){
  spectre.body.setVelocityX=0;
  spectre.anims.play('spectre_hit');
}

function spawn_spectre(){
	var spectre = spectres.create( 63, 291, 'spectre').setSize(63,94).setOffset(3,66);
	spectre.setVelocityX(70);
	spectre.anims.play('spectre_walk', true);
	timer.delay *=0.99
}

function att_spectre(){
  var range;
  for (var i = 0; i < spectres.children.entries.length; i++) {
    if (-1<spectres.children.entries[i].body.center.y-player.body.center.y<1){
      range = spectres.children.entries[i].body.center.x-player.body.center.x;
      if (-1<range<1){
        if(player.body.facing==13 && range<=0 || player.body.facing==14 && range>=0){
          spectres.remove(spectres.children.entries[i]);
        }
      }
    }
  }
}
