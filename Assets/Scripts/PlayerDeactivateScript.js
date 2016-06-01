#pragma strict

function Start () {

}

function Awake() {

	if (!GetComponent.<NetworkView>().isMine){ 
		//GetComponentInChildren(Camera).enabled = false; // disable the camera of the non-owned Player; 
		//GetComponentInChildren(AudioListener).enabled = false; // Disables AudioListener of non-owned Player - prevents multiple AudioListeners from being present in scene. 
		GetComponentInChildren(CharMove).enabled = false; 
		this.GetComponent.<Rigidbody2D>().isKinematic = true;
		Debug.Log(this.GetComponent.<Rigidbody2D>().isKinematic);
		//this.collider2D.isTrigger = true;
		Destroy(this.GetComponent.<Rigidbody2D>());
		//this.rigidbody2D.IsAwake = false;
	} 
}

function Update () {

}