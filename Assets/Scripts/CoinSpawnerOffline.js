#pragma strict
var coin : GameObject;
//spawn holder
var Spawner : Transform;
var spawnChance = 1;
var regularCoin = 10;
var specialCoin = 1;
var maxChance = 100;
var radius = 5;
var coinPrefabs : GameObject[];

function Update () 
{	
	var position = Vector3(Random.Range(-5, 5), Random.Range(0, 5), 0);		
		if(Random.Range(0,maxChance) < regularCoin)
		{
			Instantiate (coin, position + transform.position,  transform.rotation);
			
		}
		if(Random.Range(0,maxChance) < specialCoin)
		{
			//choose a random enemy prefab to spawn
			var chosenCoin:GameObject = coinPrefabs[Random.Range(0, coinPrefabs.length)];
			Instantiate (chosenCoin, position + transform.position,  transform.rotation);			
			
		}
	}