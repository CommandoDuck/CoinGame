#pragma strict


var score0:GUIText;
var score1:GUIText;
var score2:GUIText;
var score3:GUIText;
var score = [score0, score1, score2, score3];
var playerScores = ScoreScript.playerScores;
function Start () {
}

function Update () 
{
	Debug.Log(playerScores.Keys);
	for(var str in playerScores.Keys)
	{
		var i:int;
		i++;
		//var currScoreText = Network.Instantiate(score[i], transform.position,  transform.rotation, 0);
		var currScoreText = score[i];
		currScoreText.enabled = true;
		currScoreText.text = "Player " + i + ": " + playerScores[str].ToString();
		Debug.Log(playerScores[str]);
		//playerScore[i] = playerScores[str];
		var scoreValues = new Array();
		scoreValues.Push(playerScores[str]);
	}
	//{
	//}
}