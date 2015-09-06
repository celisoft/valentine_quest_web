function lvl07_create()
{
	music = this.game.add.audio('music_grotoxien');
	music.play('',0,1,true);
	this.game.add.image(0,0,'bg_grotoxienne');
	//Activate physic engine
		
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	platforms = game.add.group();
	platforms.enableBody = true;
	
	//Generating grounds
	generate_ground(1,6,0,'ground_grotoxien');
	generate_ground(11,15,1,'ground_grotoxien');
	generate_ground(8,10,2,'ground_grotoxien');
	generate_ground(4,7,3,'ground_grotoxien');
	generate_ground(13,15,3,'ground_grotoxien');
	generate_ground(3,3,4,'ground_grotoxien');
	generate_ground(1,3,5,'ground_grotoxien');
	generate_ground(9,14,5,'ground_grotoxien');
	generate_ground(6,10,7,'ground_grotoxien');
	generate_ground(0,2,9,'ground_grotoxien');
	generate_ground(4,6,9,'ground_grotoxien');
	generate_ground(0,16,11,'ground_grotoxien');

	//Integrate exit
	exit_door = this.game.add.sprite(11*64, 10*64, 'door_grotoxien');
	this.game.physics.arcade.enable(exit_door);
	exit_door.body.immovable = true;

	//Integrate collectables
	hearts = game.add.group();
	hearts.enableBody = true;
	var heart = hearts.create(2*64,4*64, 'heart');
	heart = hearts.create(15*64,2*64, 'heart');
	heart.visible = false;
	heart = hearts.create(3*64,10*64, 'heart');
	heart.visible = false;
	heart = hearts.create(8*64,64, 'heart');
	heart.visible = false;



	//Integrating dangers
	monsters = game.add.group();
	monsters.enableBody = true;
	var monster = game.add.sprite(9*64,6*64, 'monster');
	monster.animations.add('moving', [ 1, 2], 1, true);
	monster.animations.play('moving');
	monsters.add(monster);
	monster_max = 7;
	monster_cpt = 0;
	monster_dir = 0;
       
	monster = game.add.sprite(2*64,10*64, 'monster');
	monster.animations.add('moving', [ 1, 2], 1, true);
	monster.animations.play('moving');
	monsters.add(monster);
	monster_max = 7;
	monster_cpt = 0;
	monster_dir = 0;
	

	
	//Integrate player
	player = game.add.sprite(0*64, 0*64, 'grotoxienne');
	player.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(player);
	player.body.gravity.y = 675;
	player.body.collideWorldBounds = true;
	player.animations.add('walk', [1, 2], 10, true);
	player_dir = 0;
	
	this.game.time.events.loop(Phaser.Timer.SECOND*0.25, monsters_move, this);
	key_cursors = this.game.input.keyboard.createCursorKeys();
}
function lvl07_switch()
{
	platforms.removeAll(true, false);
	dangers = 0;
	exit_door.destroy();
	player.destroy();
	player_dir = 1;
	key_cursors = 0;
	music.stop();

	this.game.state.start('lvl08');
}

function lvl07_update()
{
	this.game.physics.arcade.collide(player, platforms);

	player_move();

	if(exit_door.frame ==1)
	{	
		this.game.physics.arcade.overlap(player, exit_door, lvl07_switch, null, this);
	}

	this.game.physics.arcade.overlap(player, monsters, monster_collision, null, this);
	this.game.physics.arcade.overlap(player, hearts, get_heart, null, this);
}

