#pragma strict
var animator : Animator;
var grounded = false;
var groundMask : LayerMask;
var groundCheck : Transform;
var startTime : float;
var coinHolder : GameObject;
function Start () {
	startTime = Time.time;
}

function Update () {
	grounded = Physics2D.OverlapCircle(groundCheck.position, 1.0, groundMask);
	//animator.SetBool("grounded", grounded);
	CoinDestroy();
}

@RPC
function CoinDestroy()
{	
	if(startTime + 4 < Time.time)
	{
		Network.Destroy(coinHolder);
	}
}