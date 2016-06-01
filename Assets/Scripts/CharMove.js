#pragma strict
var speed = 5.0;
var banana : GameObject;
static var blobPos : Vector3;
var rSpeed = 1.0;
var changeSpeed : float;
var animator : Animator;
var grounded = false;
var groundMask : LayerMask;
var groundCheck : Transform;
var doubleReady = true;
var bonusJump = 1.0;
var bonusSpeed = 1.0;
var gameOver : GameObject;
var gameOverPoint : Vector3;
function Start () {
	
}

function Awake () {
	if (!GetComponent.<NetworkView>().isMine){
		this.enabled = false;	
	 } 
	gameOverPoint = Vector3(0.34, 0.74, 0);
}

function Update () {
	
	var curVel:Vector2 = this.GetComponent.<Rigidbody2D>().velocity;
	var theScale = banana.transform.localScale;
	//var thing  = banana.transform.rotation;
	animator.SetFloat("speed", Mathf.Abs (curVel.x));
	blobPos = transform.position;	
	
	grounded = Physics2D.OverlapCircle(groundCheck.position, 0.2, groundMask);

	animator.SetBool("grounded", grounded);
	if(grounded)
	{
		doubleReady = true;
	}
	
	if(Input.GetAxis("Horizontal") > 0)
	{
		curVel.x = speed * bonusSpeed;
		banana.transform.localScale.x = 1;
	} else if (Input.GetAxis("Horizontal") < 0)
	{
		curVel.x = -speed * bonusSpeed;
		banana.transform.localScale.x = -1;
	}
	
	this.GetComponent.<Rigidbody2D>().velocity = curVel;
	//update the velocity...
	if(Input.GetKeyDown("space") && grounded) {
		this.GetComponent.<Rigidbody2D>().AddForce(Vector2(0, 1500.0f * bonusJump));
		doubleReady = true;
	} else if(Input.GetKeyDown("space") && doubleReady)
	{			
		this.GetComponent.<Rigidbody2D>().AddForce(Vector2(0, 950.0f * bonusJump));
		doubleReady = false;
	}
	
	transform.rotation.z = 0;
}	

//function CoinName(name)
//{
//	if(name == "JumpCoinHolder(Clone)" || name == "JumpCoin")
//	{	
//		Debug.Log("Jump");
//		bonusJump = 1.5;
//		yield WaitForSeconds(3);
//		bonusJump = 1.0;
//	}else if (name == "FastCoinHolder(Clone)" || name == "FastCoin")
//	{
//		Debug.Log("red");
//		bonusSpeed = 1.5;
//		yield WaitForSeconds(3);
//		bonusSpeed = 1.0;
//	} else if (name == "LowGrovCoinHolder(Clone)" || name == "LowGravCoin")
//	{
//		Debug.Log("green");
//		rigidbody2D.gravityScale = 1;
//		rigidbody2D.drag = 0.5;
//		yield WaitForSeconds(3);
//		rigidbody2D.gravityScale = 5;
//		rigidbody2D.drag = 1;
//	} else if (name == "HighGravCoinHolder(Clone)" || name == "HighGravCoin")
//	{
//		Debug.Log("purple");
//		rigidbody2D.gravityScale = 10;
//		yield WaitForSeconds(3);
//		rigidbody2D.gravityScale = 5;
//	}
//}

function  OnTriggerEnter2D(other : Collider2D)
{
	if(other.tag == "Coin")
	{
		GetComponent.<AudioSource>().Stop();
		GetComponent.<AudioSource>().Play();
	} else if(other.tag == "fall")
	{
		Instantiate(gameOver, gameOverPoint, transform.rotation);
		Debug.Log("HI");
	} else if (other.tag == "high")
	{
		Instantiate(gameOver, gameOverPoint, transform.rotation);
		Debug.Log("HI");
	}
	
}
function Deactivate()
{
	animator.enabled = false;
}