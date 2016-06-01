#pragma strict

static var charToMake : GameObject;
static var characterSelected = false;
static var theChar;
public var playerLimit:int = 4;
private var totalPlayers:int = 0;
private var networkHandler:NetworkHandler;

function start() {
	networkHandler = this.GetComponent("NetworkHandler") as NetworkHandler;
	GetComponent.<NetworkView>().RPC("NetworkCharSelected", RPCMode.All);	
	Debug.Log(theChar);
}

@RPC
function NetworkCharSelected() {
	totalPlayers ++;
	
	if(totalPlayers == playerLimit) {
		if(Network.isServer) {
			networkHandler.GetComponent.<NetworkView>().RPC("LoadLevel", RPCMode.AllBuffered, "WellShit", 3);
		//	networkHandler.LoadLevel("WellShit", 3);
		}
	}
}