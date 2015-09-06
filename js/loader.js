//This var will contains the displayed text at the loading screen
var load_status;

function loader_preload()
{
	this.game.load.image('menu_bg', 'assets/splashscreen.png');
}

//Preload data required by the game
function loader_load()
{
	//Backgrounds
	this.game.load.image('bg_soltarienne', 'assets/backgrounds/bg_soltarienne.png');
	this.game.load.image('bg_soltarien', 'assets/backgrounds/bg_soltarien.png');
	this.game.load.image('bg_nuagagarcon', 'assets/backgrounds/bg_nuagagarcon.png');
	this.game.load.image('bg_nuagafille', 'assets/backgrounds/bg_nuagafille.png');
	this.game.load.image('bg_grotoxienne', 'assets/backgrounds/bg_grotoxienne.png');
	this.game.load.image('bg_grotoxien', 'assets/backgrounds/bg_grotoxien.png');
	this.game.load.image('bg_aqualienne', 'assets/backgrounds/bg_aqualienne.png');
	this.game.load.image('bg_aqualien', 'assets/backgrounds/bg_aqualien.png');

	//Common graphics
	this.game.load.image('ground_soltarien', 'assets/grounds/ground_soltarien.png');
	this.game.load.image('ground_nuaga', 'assets/grounds/ground_nuaga.png');
	this.game.load.image('ground_grotoxien', 'assets/grounds/ground_grotoxien.png');
	this.game.load.image('ground_aqualien', 'assets/grounds/ground_aqualien.png');
	this.game.load.spritesheet('door_soltarien', 'assets/doors/door_soltarien.png', 128, 128, 2);
	this.game.load.spritesheet('door_nuaga', 'assets/doors/door_nuaga.png', 128, 128, 2);
	this.game.load.spritesheet('door_grotoxien', 'assets/doors/door_grotoxien.png', 128, 128, 2);
	this.game.load.spritesheet('door_aqualien', 'assets/doors/door_aqualien.png', 128, 128, 2);

	//Simple collectables
	this.game.load.image('heart', 'assets/heart.png');

	//Animated enemies / danger
	this.game.load.spritesheet('monster', 'assets/monster.png', 64, 64,2);

	//Player spritesheet
	this.game.load.spritesheet('soltarienne', 'assets/players/soltarienne.png', 32, 64, 2);
	this.game.load.spritesheet('soltarien', 'assets/players/soltarien.png', 32, 64, 2);
	this.game.load.spritesheet('nuagagarcon', 'assets/players/nuagagarcon.png', 32, 64, 2);
	this.game.load.spritesheet('nuagafille', 'assets/players/nuagafille.png', 32, 64, 2);
	this.game.load.spritesheet('grotoxienne', 'assets/players/grotoxienne.png', 32, 64, 2);
	this.game.load.spritesheet('grotoxien', 'assets/players/grotoxien.png', 32, 64, 2);
	this.game.load.spritesheet('aqualienne', 'assets/players/aqualienne.png', 32, 64, 2);
	this.game.load.spritesheet('aqualien', 'assets/players/aqualien.png', 32, 64, 2);

	//Background music
	this.game.load.audio('music_soltarien', ['assets/sfx/mp3/soltarien.mp3', 'assets/sfx/ogg/soltarien.ogg']);
	this.game.load.audio('music_nuaga', ['assets/sfx/mp3/nuaga.mp3', 'assets/sfx/ogg/nuaga.ogg']);
	this.game.load.audio('music_grotoxien', ['assets/sfx/mp3/grotoxien.mp3', 'assets/sfx/ogg/grotoxien.ogg']);
	this.game.load.audio('music_aqualien', ['assets/sfx/mp3/aqualien.mp3', 'assets/sfx/ogg/aqualien.ogg']);

	//In-game sounds
	this.game.load.audio('snd_capture', ['assets/sfx/mp3/beep.mp3', 'assets/sfx/ogg/beep.ogg']);
	this.game.load.audio('snd_door', ['assets/sfx/mp3/door_in.mp3', 'assets/sfx/ogg/door_in.ogg']);
	//this.game.load.audio('snd_door_exit', ['assets/sfx/mp3/door_out.mp3', 'assets/sfx/ogg/door_out.ogg']);

	//Loading endings
	this.game.load.image('pic_end', 'assets/happyend.png');
	this.game.load.image('pic_fail', 'assets/gameover.png');

	this.game.load.start();
}

//Display loading text and launch preload after defining what to do next
function loader_create()
{
	this.game.add.image(0, 0, 'menu_bg');

	this.game.load.onFileComplete.add(loader_refresh, this);
	this.game.load.onLoadComplete.add(loader_next, this);

	//Display the status of file loading to inform the user that it's in progress
	load_status = this.game.add.text(this.game.world.width/2, this.game.world.height-32, 'Preloading data', {fontSize: '16px', fill: '#000000'});

	loader_load();
}

function loader_refresh(progress, cacheKey, success, totalLoaded, totalFiles)
{
	load_status.setText("[" + cacheKey + "]");
}

//Swich to menu state
function loader_next()
{
	this.game.state.start('menu');
}
