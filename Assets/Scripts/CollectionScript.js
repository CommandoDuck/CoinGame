#pragma strict
//static var score : int;
var coinHolder : GameObject;
var scoreObject : ScoreScript;

function Start()
{	
	scoreObject = GameObject.Find('_Scripts').GetComponent('ScoreScript');
}

function OnTriggerEnter2D(other : Collider2D)
{
	if(other.tag == "Player")
	{
		var name = gameObject.name;
		Debug.Log(name);
		//destroys the object
		//GameObject.Find("Player(Clone)").SendMessage("AddCoin", 1, SendMessageOptions.DontRequireReceiver);
		//GameObject.Find("Player1(Clone)").SendMessage("CoinName", name, SendMessageOptions.DontRequireReceiver);
		Network.Destroy(coinHolder);
		scoreObject.GetComponent.<NetworkView>().RPC("AddPoint", RPCMode.All, other.GetComponent.<NetworkView>().owner.ToString());
		//scoreObject.networkView.RPC("AddCoin", RPCMode.All, other.networkView.owner.ToString());
	}//if(other.name == "Player2(Clone)")
//	{
//		name = gameObject.name;
//		Debug.Log(name);
//		//destroys the object
//		//GameObject.Find("Player(Clone)").SendMessage("AddCoin", 1, SendMessageOptions.DontRequireReceiver);
//		GameObject.Find("Player2(Clone)").SendMessage("CoinName", name, SendMessageOptions.DontRequireReceiver);
//		Network.Destroy(coinHolder);
//		scoreObject.networkView.RPC("AddPoint", RPCMode.All, other.networkView.owner.ToString());
//		//scoreObject.networkView.RPC("AddCoin", RPCMode.All, other.networkView.owner.ToString());
//	} else if(other.name == "Player3(Clone)")
//	{
//		name = gameObject.name;
//		Debug.Log(name);
//		//destroys the object
//		//GameObject.Find("Player(Clone)").SendMessage("AddCoin", 1, SendMessageOptions.DontRequireReceiver);
//		GameObject.Find("Player3(Clone)").SendMessage("CoinName", name, SendMessageOptions.DontRequireReceiver);
//		Network.Destroy(coinHolder);
//		scoreObject.networkView.RPC("AddPoint", RPCMode.All, other.networkView.owner.ToString());
//		//scoreObject.networkView.RPC("AddCoin", RPCMode.All, other.networkView.owner.ToString());
//	} else if(other.name == "Player4(Clone)")
//	{
//		name = gameObject.name;
//		Debug.Log(name);
//		//destroys the object
//		//GameObject.Find("Player(Clone)").SendMessage("AddCoin", 1, SendMessageOptions.DontRequireReceiver);
//		GameObject.Find("Player4(Clone)").SendMessage("CoinName", name, SendMessageOptions.DontRequireReceiver);
//		Network.Destroy(coinHolder);
//		scoreObject.networkView.RPC("AddPoint", RPCMode.All, other.networkView.owner.ToString());
//		//scoreObject.networkView.RPC("AddCoin", RPCMode.All, other.networkView.owner.ToString());
//	}
}
