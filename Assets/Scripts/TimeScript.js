#pragma strict

//static public var timer:int = 0;


var newTime:float; 
var guiTime:GUIText;
var coinSpawner1:GameObject;
var coinSpawner2:GameObject;
var coinSpawner3:GameObject;
var coinSpawner4:GameObject;
var coinSpawner5:GameObject;
var coinSpawner6:GameObject;
var GameOver:GameObject;
private var networkHandler:NetworkHandler;

function Start () {
	
	newTime = 10.0;
}

function Update () {
	if(Network.isServer)
	{		
		if(newTime > .5)
		{		
			var timer = Time.deltaTime;
			newTime -= timer;
			GetComponent.<NetworkView>().RPC("UpdateTime",RPCMode.All,newTime);
		} else //if (newTime < .05)
		{
			coinSpawner1.active = false;
			coinSpawner2.active = false;
			coinSpawner3.active = false;
			coinSpawner4.active = false;
			coinSpawner5.active = false;
			coinSpawner6.active = false;
			GameOver.active = true;
		}
		//Debug.Log(timer);
	}
	//Debug.Log(newTime);
}

@RPC
function EndGame()
{

	networkHandler = this.GetComponent("NetworkHandler") as NetworkHandler;
	if(Network.isServer) {
			//networkHandler.networkView.RPC("LoadLevel", RPCMode.AllBuffered, "EndScreen", 3);
			//networkHandler.LoadLevel("EndScreen", 3);
			GetComponent.<NetworkView>().RPC("LoadLevel", RPCMode.AllBuffered, "EndScreen", 3);
		}
}

@RPC
function UpdateTime(timeToShow:float)
{
	guiTime.text = timeToShow.ToString("0");
}

//function UpdateScore (newTime:int) {
//	timer += newTime;
//	//update GUI
//	guiText.text = timer.ToString();
//}