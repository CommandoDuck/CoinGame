#pragma strict

static var _gameName:String = "";
static var hostToJoin:HostData;
static var willServe = false;

var gameType = "";
var sceneToPlay:String = "";
var hostList : HostData[];

function OnMasterServerEvent(msEvent:MasterServerEvent) {
    if (msEvent == MasterServerEvent.HostListReceived)
        hostList = MasterServer.PollHostList();
}

function LaunchServer(gameName:String) {
	
	
	Debug.Log("Lawnch Servo:" + " " + gameType + " " + gameName);
	this._gameName = gameName;
	
	var useNat = !Network.HavePublicAddress();
	Network.InitializeServer(10, 25000, useNat);
	
	//Debug.Log(this._gameName);
	//game type - unique name for __all_ games. like "spaceHobo"
	//game name = unique name for *this* instance of the game "server name"
	//
}

function ServerLoadLevel() {
	//LaunchServer();
	Debug.Log("Aww bene.");
	GetComponent.<NetworkView>().RPC("LoadLevel", RPCMode.AllBuffered, sceneToPlay, 2);
}

function ClientJoinGame() {
	Network.Connect(hostToJoin);
}

function OnServerInitialized() {
	Debug.Log("Server setup and ready!");
	Debug.Log("gn: "+ this._gameName);
	MasterServer.RegisterHost(gameType, this._gameName, "Game Description goes here");
	
	(this.GetComponent('PlayerList') as PlayerList).addPlayer(this.GetComponent.<NetworkView>().owner);
	
	//remote procedure call
	//call this function on all clients (of this script type)
	//networkView.RPC("LoadLevel", RPCMode.AllBuffered, sceneToPlay, 2);
}


@RPC
function LoadLevel(sceneName:String, levelPrefix:int) {
	Debug.Log("Loading levellol");
	
	//stop sending messages
	Network.SetSendingEnabled(0, false);
	
	//stop receiving messages
	Network.isMessageQueueRunning = false;
	
	//Set level prefix
	//Prevents old updates from leaking into new level
	Network.SetLevelPrefix(levelPrefix);
	
	//change level!
	Application.LoadLevel(sceneName);
	
	yield;
	yield;
	yield;
	yield;
}