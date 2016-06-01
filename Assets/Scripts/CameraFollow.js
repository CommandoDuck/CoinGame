#pragma strict

var targ : GameObject;

function Update () {
	var thisPosition : Vector3 = transform.position;
	var targPosition = Vector3.Lerp( transform.position, targ.transform.position, 0.1);
	targPosition.z = thisPosition.z;
	this.transform.position = targPosition;
}