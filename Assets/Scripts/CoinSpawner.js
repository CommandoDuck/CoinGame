#pragma strict
var coin : GameObject;
//spawn holder
var Spawner : Transform;
var spawnChance = 1;
var maxSpawnChance = 100;
var regularCoin = 10;
var specialCoin = 1;
var maxChance = 100;
var radius = 5;
var coinPrefabs : GameObject[];
var spawn = false;

function Update () 
{	
	var position = Vector3(Random.Range(-5, 5), Random.Range(0, 5), 0);
	if(spawn)
	{		
		if(Random.Range(0,maxChance) < regularCoin)
		{
			Network.Instantiate (coin, position + transform.position,  transform.rotation, 0);
			spawn = false;
		}
		if(Random.Range(0,maxChance) < specialCoin)
		{
			//choose a random enemy prefab to spawn
			var chosenCoin:GameObject = coinPrefabs[Random.Range(0, coinPrefabs.length)];
			Network.Instantiate (chosenCoin, position + transform.position,  transform.rotation, 0);			
			spawn = false;
		}
	}
	
	if(!spawn && Random.Range(0,maxSpawnChance) < spawnChance)
	{
		SpawnBool();
	}
}

function SpawnBool()
{
	spawn = false;
	yield WaitForSeconds(3);
	spawn = true;
}