#pragma strict

function Start () {
		// Allow receiving data again
	Network.isMessageQueueRunning = true;
	// Now the level has been loaded and we can start sending out data to clients
	Network.SetSendingEnabled(0, true);
}

function Update () {

}