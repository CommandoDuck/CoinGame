#pragma strict

//'state' of the menu
//'Intro' 'Host', 'Join'
private var menuState = "Intro";
private var gameName : String = "";

var gameType = "";

function OnGUI()
{
	//Start a GUI Group
	//All other gui calls will draw onto the center of the screen into a box 800px x 600px
	GUI.BeginGroup(new Rect(Screen.width / 2, Screen.height / 2, 800, 600));
	
	//simple menu state machine
	if(menuState == "Intro")
	{
		//draw the intro screen
		if(GUI.Button(Rect(10,10,150,50), "Host Game"))
		{
			menuState = "HostGame";
		}
		
		if(GUI.Button(Rect(10,60,150,50), "Join Game"))
		{
			menuState = "JoinGame";
			MasterServer.RequestHostList(gameType); //get the hosts
		}
	} else if(menuState == "HostGame")
	{
		GUI.Label(Rect(0,0,200,20), "Game Name:");
		gameName = GUI.TextField(Rect(10,25,200,20), gameName, 40);
		
		if(GUI.Button(Rect(10,60,150,100), "Begin Game"))
		{
			LaunchServer();
		}
	}
		GUI.EndGroup();
}

function LaunchServer()
{
	var useNat = !Network.HavePublicAddress();
	Network.InitializeServer(10, 25000, useNat);
	
	
	//game type - uniqu name for __all) games. like "spaceHost*
	//game name = uniqu name for *this* instance of the game
	MasterServer.RegisterHost(gameType, gameName, "Game Description goes here");
}