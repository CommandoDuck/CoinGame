#pragma strict

var onoff:OnOff;
var doorToOpen:GameObject;

function Start () {
	onoff = this.GetComponent("OnOff");
}

function OnTriggerEnter2D() {
	this.GetComponent.<NetworkView>().RPC("TurnOn", RPCMode.All);
	doorToOpen.active = false;
}

function Update () {

}