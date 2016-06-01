#pragma strict

public var spawnPoint:Transform;
public var player1:GameObject;
public var player2:GameObject;
static var theChar : int;

function Start () {
	var myPlayer;
	
	theChar = PlayerList.players.length;
	//AddPlayer();
	if(theChar == 1)
	{
		myPlayer = Network.Instantiate(player1, spawnPoint.position, spawnPoint.rotation, 0);
		AddPlayer();
	} else if(theChar == 2)
	{
		myPlayer = Network.Instantiate(player2, spawnPoint.position, spawnPoint.rotation, 0);
		AddPlayer();
	}	
	
	Debug.Log(theChar);
	//(Camera.main.GetComponent('CameraFollow') as CameraFollow).targ = myPlayer;
}

@RPC
function AddPlayer() {
	//theChar++;
}

function Update () {

}