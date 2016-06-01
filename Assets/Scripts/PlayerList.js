#pragma strict

static public var players:Array = [];
static public var pid : int = 0;

function Update()
{
	
}

public function addPlayer(player:NetworkPlayer ) {
	
	Debug.Log("I'm" + player);
	GetComponent.<NetworkView>().RPC("SetPlayerID", RPCMode.AllBuffered, player.ToString());
}

function OnPlayerConnected(player: NetworkPlayer) {
	Debug.Log("This shit works");
	addPlayer( player );
}

function OnServerInitialized() {
	Debug.Log("Player stuff");
	//addPlayer( this.networkView.owner );
}

@RPC
function SetPlayerID(id:String) {
	players.push(id);
	Debug.Log("Players: " + players.length);
}