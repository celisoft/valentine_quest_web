function lvl05_create()
{
	music = this.game.add.audio('music_nuaga');
	music.play('',0,1,true);
	this.game.add.image(0,0,'bg_nuagagarcon');
	//Activate physic engine
		
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	platforms = game.add.group();
	platforms.enableBody = true;
	
	//Generating grounds
	generate_ground(3,10,1,'ground_nuaga');
	generate_ground(13,15,1,'ground_nuaga');
	generate_ground(11,11,2,'ground_nuaga');
	generate_ground(3,7,3,'ground_nuaga');
	generate_ground(9,10,3,'ground_nuaga');
	generate_ground(12,12,3,'ground_nuaga');
	generate_ground(0,5,5,'ground_nuaga');
	generate_ground(4,15,5,'ground_nuaga');
	generate_ground(7,14,5,'ground_nuaga');
	generate_ground(0,6,7,'ground_nuaga');
	generate_ground(4,6,9,'ground_nuaga');
	generate_ground(0,16,11,'ground_nuaga');

	//Integrate exit
	exit_door = this.game.add.sprite(8*64, 9*64, 'door_nuaga');
	this.game.physics.arcade.enable(exit_door);
	exit_door.body.immovable = true;

	//Integrate collectables
	hearts = game.add.group();
	hearts.enableBody = true;
	var heart = hearts.create(9*64,4*64, 'heart');
	heart = hearts.create(3*64,10*64, 'heart');
	heart.visible = false;
	heart = hearts.create(4*64,0*64, 'heart');
	heart.visible = false;		
	heart = hearts.create(0,4*64, 'heart');
	heart.visible = false;

	//Integrating dangers
	monsters = game.add.group();
	monsters.enableBody = true;
	var monster = game.add.sprite(4*64,2*64, 'monster');
	monster.animations.add('moving', [ 1, 2], 1, true);
	monster.animations.play('moving');
	monsters.add(monster);
	monster_max = 5;
	monster_cpt = 0;
	monster_dir = 0;
       
	monster = game.add.sprite(0*64,10*64, 'monster');
	monster.animations.add('moving', [ 1, 2], 1, true);
	monster.animations.play('moving');
	monsters.add(monster);
	monster_max = 5;
	monster_cpt = 0;
	monster_dir = 0;
	

	
	//Integrate player
	player = game.add.sprite(12*64, 10*64, 'nuagagarcon');
	player.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(player);
	player.body.gravity.y = 675;
	player.body.collideWorldBounds = true;
	player.animations.add('walk', [1, 2], 10, true);
	player_dir = 0;
	
	this.game.time.events.loop(Phaser.Timer.SECOND*0.25, monsters_move, this);
	key_cursors = this.game.input.keyboard.createCursorKeys();
}
function lvl05_switch()
{
	platforms.removeAll(true, false);
	dangers = 0;
	exit_door.destroy();
	player.destroy();
	player_dir = 1;
	key_cursors = 0;
	music.stop();

	this.game.state.start('lvl06');
}

function lvl05_update()
{
	this.game.physics.arcade.collide(player, platforms);

	player_move();

	if(exit_door.frame ==1)
	{	
		this.game.physics.arcade.overlap(player, exit_door, lvl05_switch, null, this);
	}

	this.game.physics.arcade.overlap(player, monsters, monster_collision, null, this);
	this.game.physics.arcade.overlap(player, hearts, get_heart, null, this);
}

