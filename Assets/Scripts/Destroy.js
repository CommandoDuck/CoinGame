#pragma strict


function Start () {

}

function OnTriggerEnter2D(other: Collider2D) {

	if(other.tag == "Player") {
		//scoreObject.networkView.RPC("AddPoint", RPCMode.All, other.networkView.owner.ToString());
		Network.Destroy(this.gameObject);
	}
}