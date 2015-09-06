var menu_text;
var menu_status=0;

function menu_create()
{
	//Display the background
	this.game.add.image(0, 0, 'menu_bg');
	menu_text = this.game.add.text(this.game.world.centerX,0.65*this.game.world.height,'Press any key to play',{fontSize:'38px',fill:'#8b0000'});
	menu_text.anchor.setTo(0.5,0.5);
	this.game.input.keyboard.addCallbacks(this,menu_next);
	this.game.time.events.loop(Phaser.Timer.SECOND/2, menu_blink, this);
}

//The user choose to play
function menu_next()
{
	this.game.input.keyboard.onDownCallback = null;
	this.game.state.start('lvl01');
}

function menu_blink()
{
	if(menu_status == 0)
	{
		menu_text.text = "Press any key to play";
		menu_status = 1;
	}
	else
	{
		menu_text.text = "";
		menu_status = 0;
	}
}
