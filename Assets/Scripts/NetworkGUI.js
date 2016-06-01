#pragma strict

private var menuState:String = "Intro";
private var gameName:String = "";

var gameType = "";
var sceneToPlay = "gameScene";
var hostList : HostData[];

function Start () {

}

function OnGUI() {
GUI.BeginGroup (new Rect (Screen.width / 2 - 150, Screen.height / 2, 1000, 600));
	if(menuState == "Intro") {
		if( GUI.Button(Rect (0,10,150,50), "Host Game") ) {
			menuState = "HostGame";
		}
		
		if( GUI.Button(Rect(200,10,150,50), "Join Game") ) {
			menuState = "JoinGame";
			MasterServer.RequestHostList(gameType); //get the hosts
		}
		
	} else if (menuState == "HostGame" ) {
		GUI.Label( Rect(0,0, 200, 20), "Game Name:");
		gameName = GUI.TextField(Rect(10,25, 200,20), gameName, 40);
		
		if(GUI.Button(Rect(10, 50, 150, 100), "Begin Game")) {
			LaunchServer();
		}
	}
	else if (menuState == "JoinGame") {
		//create a list of the hosts		
		var data : HostData[] = MasterServer.PollHostList();
		
		for( var element in data) {
			//can get other host info...
			//element.ip, element.port, element.comment ('game description')
			GUILayout.BeginHorizontal();
			var name = element.gameName + " " + element.connectedPlayers + "/" +element.playerLimit;
			GUILayout.Label(name);
			GUILayout.Space(5);
			
			if( GUILayout.Button("Connect") ) {
				Network.Connect(element);
				Debug.Log("Connecting...");
			}
			
			GUILayout.EndHorizontal();
		}
	}
	GUI.EndGroup();
}

function OnMasterServerEvent(msEvent:MasterServerEvent)
{
	Debug.Log("hey");
    if (msEvent == MasterServerEvent.HostListReceived)
        hostList = MasterServer.PollHostList();
        
   // Debug.Log(hostList.Length);
}

function LaunchServer() {
	var useNat = !Network.HavePublicAddress();
	Network.InitializeServer(10, 25000, useNat);
	
	//game type - unique name for __all_ games. like "spaceHobo"
	//game name = unique name for *this* instance of the game "server name"
	Debug.Log(gameType);
	MasterServer.RegisterHost(gameType, gameName, "Game Description goes here");
}

function OnServerInitialized() {
	Debug.Log("Server setup and ready!");
	
	(this.GetComponent('PlayerList') as PlayerList).addPlayer(this.GetComponent.<NetworkView>().owner);
	
	//remote procedure call
	//call this function on all clients (of this script type)
	GetComponent.<NetworkView>().RPC("LoadLevel", RPCMode.AllBuffered, sceneToPlay, 2);
}

@RPC
function LoadLevel(sceneName:String, levelPrefix:int) {
	Debug.Log("Loading level");
	
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












