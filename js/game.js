/*
 * The game starts here
 */

//Common vars
var music;
var snd_capture;
var snd_door;
//var snd_door_exit;
var platforms;
var exit_door;
var monsters;
var monster_dir;
var monster_max;
var monster_cpt;
var dangers;
var player;
var player_dir;
var key_cursors;

//Initialize game into 1024x768 canvas. Phaser.AUTO switches to WebGL if possible.
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game_div');

//State to preload game data
game.state.add('load', {preload: loader_preload, create: loader_create});

//State to display menu
game.state.add('menu', {create: menu_create});

//Level scripts
game.state.add('lvl01', {create: lvl01_create, update: lvl01_update});
game.state.add('lvl02', {create: lvl02_create, update: lvl02_update});
game.state.add('lvl03', {create: lvl03_create, update: lvl03_update});
game.state.add('lvl04', {create: lvl04_create, update: lvl04_update});
game.state.add('lvl05', {create: lvl05_create, update: lvl05_update});
game.state.add('lvl06', {create: lvl06_create, update: lvl06_update});
game.state.add('lvl07', {create: lvl07_create, update: lvl07_update});
game.state.add('lvl08', {create: lvl08_create, update: lvl08_update});

//States used to manage the 4 possible ends
//game.state.add('end', {create: end_create});
game.state.add('fail', {create: fail_create});
game.state.add('end', {create: end_create});

//Start the game with load state
game.state.start('load');

//Init Grounds
function generate_ground(startX, stopX, coordY, assetID)
{
	for (var x = startX; x< stopX; x++)
	{
		var ground = platforms.create(x*64,coordY*64, assetID);
		ground.body.immovable=true;
		ground.body.checkCollision.down=false;
	}
}
//function called at each update
function player_move()
{
	player.body.velocity.x = 0;
	if(key_cursors.left.isDown)
	{
		if(player_dir == 0)
		{
			player.scale.x *= -1;
			player_dir = 1;
		}

		player.body.velocity.x = -400;
		player.animations.play('walk');
	}
	else if(key_cursors.right.isDown)
	{
		if(player_dir == 1)
		{
			player.scale.x *= -1;
			player_dir = 0;
		}
		player.body.velocity.x = 400;
		player.animations.play('walk');
	}
	else
	{
		player.animations.stop();
	}

	if(key_cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -450;
	}
}
//Function called every seconds
function monsters_move()
{
	monsters.forEach(monster_move, this);

	//The monster direction is right
	if(monster_dir == 0)
	{
		if(monster_cpt == monster_max)
		{
			monster_dir = 1;
		}
		monster_cpt++;
	}
	else
	{
		if(monster_cpt == 1)
		{
			monster_dir = 0;
		}
		monster_cpt--;
	}
}

//Function used to move a monster
function monster_move(child)
{
	//The monster direction is right
	if(monster_dir == 0)
	{
		if(monster_cpt == monster_max)
		{
			child.scale.x*= -1;
		}
		else
		{
			child.x += 64;
		}
	}
	else
	{
		if(monster_cpt == 1)
		{
			child.scale.x *= -1;
		}
		else
		{
			child.x -=64;
		}
	}
}
//Function called when player collides with a danger
function monster_collision(player, monster)
{
	//Do not use destroy() -> a.body will be null in update function
	player.kill();
	music.stop();
	this.game.state.start('fail');
}

//Function for each capture
function get_heart(player, heart)
{
	if(heart.visible)
	{
		heart.kill();
		if(!snd_capture)
		{
			snd_capture = this.game.add.audio('snd_capture');
		}
		snd_capture.play();
		heart_reborn();
	}
}

//Function to make new hearts
function heart_reborn()
{
	var h = hearts.getFirstAlive();
	if(h != null)
	{
		h.visible = true;
	}
	else
	{
		exit_door.frame = 1;
	      	if(!snd_door)
		{
			snd_door = this.game.add.audio('snd_door');
		}
		snd_door.play();
	}
}
//Function to set 'menu' state
function back_to_menu()
{
	this.game.state.start('menu');
}
