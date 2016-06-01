#pragma strict

var minus = 0;
var minusDelay : float;
	
public var progress_empty:GUIStyle;
public var progress_full:GUIStyle;
var newWidth : float;
//how for the bar is filled in
//0 for empty
//1 for full
private var barDisplay:float;

//position of the bar
public var pos:Vector2 = new Vector2(80,20);
//the size of the bar
public var size:Vector2 = new Vector2(600,50);

public var emptyBar:Texture2D;
public var fullBar:Texture2D;

static var playerScores = new Hashtable();  
var coin = new Hashtable();
var scoreObject : ScoreScript;
var coinAmount : int;
var coinSub = false;
var fontStyle : Font;

function Start () {
	coinAmount = 10;
}

function OnGUI() {
	var style : GUIStyle = new GUIStyle();
	style.font = fontStyle;
	style.fontSize = 20;
	style.normal.textColor = Color.magenta;
	var i : int;
	for(var str in playerScores.Keys) {
		//Debug.Log(playerScores[str].ToString());
		i++;
		var adjust = (i * 160) - 150;
		GUI.Box(new Rect(Screen.width - 680 + adjust, Screen.height - 60, 100, 20), i + ": " + playerScores[str].ToString(), style);
	
    }
   	
//   	for(var str in coin.Keys)
//	{	
//		//i++;
//		//adjust = i * 300;
//		GUI.DrawTexture(Rect(pos.x * adjust + 100,pos.y,size.x,size.y),fullBar);
//		GUI.DrawTexture(Rect(pos.x * adjust + 100,pos.y,newWidth,size.y),emptyBar);
//	}
}

function Update () {
//	var crappyClone = new Hashtable();
//	coinAmount = 0;
//	for(str in coin.Keys)
//	{
//		coinAmount += int.Parse(coin[str].ToString());
//		coinAmount = Mathf.Clamp(coinAmount,0,20);
//		if(minus <= 0)
//		{
//			//coinSub = true;
//			minus = minusDelay;
//			
//			
//			var minusOne = int.Parse(coin[str].ToString());
//			crappyClone[str] = Mathf.Clamp(minusOne - 1,0,19);
//			if(crappyClone.)
//			//crappyClone[str] = minusOne - 1;
//		} else {
//			//coinSub = false;
//			minus --;
//			
//			
//			var dahSame = int.Parse(coin[str].ToString());
//			crappyClone[str] = dahSame;
//		}
		
		
	//}
	
	//coin = crappyClone;
	/*
	
	} */
	
//	barDisplay = 20f / coinAmount;
//	newWidth = 200 / barDisplay;
//	newWidth = Mathf.Clamp(newWidth, 0, 200);
	//Debug.Log(barDisplay);
	Debug.Log("Amt" + coinAmount);
}

@RPC
public function AddPoint(pid:String) {
	if( !playerScores[pid] ) {
		playerScores.Add(pid, 0);
	}
	
	var pscore : int = playerScores[pid];  
	playerScores[pid] = pscore + 1;
	
	Debug.Log("Adding point for: " + pid);
}

//@RPC
//public function AddCoin(pid:String) {
//	if( coin[pid] == null ) {
//		coin.Add(pid, 20);
//	}
//	
//	var pCoin : int = coin[pid];  
//	coin[pid] = pCoin + 1;
//	Debug.Log("Adding health for: " + pid);
//}
