using UnityEngine;
using System.Collections;

public class CCS : MonoBehaviour {
	
	public float maxSpeed = 10f;
	bool facingRight = true;
	
	Animator anim;
	
	//sets up the grounded stuff
	bool grounded = false;
	bool touchingWall = false; 
	public Transform groundCheck;
	public Transform wallCheck;
	float groundRadius = 0.2f;
	float wallTouchRadius = 0.2f;
	public LayerMask whatIsGround;
	public LayerMask whatIsWall;
	public float jumpForce = 700f;
	public float jumpPushForce = 10f;
	
	public float numberOfFriends = 0f;
	
	
	//double jump
	bool doubleJump = false;
	
	// Use this for initialization
	void Start () {
		
		anim = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		
		// The player is grounded if a linecast to the groundcheck position hits anything on the ground layer.
		grounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, whatIsGround);
		touchingWall = Physics2D.OverlapCircle(wallCheck.position, wallTouchRadius, whatIsWall);
		anim.SetBool("Ground", grounded);
		
		if (grounded) 
		{
			doubleJump = false;
		}
		
		anim.SetFloat ("vSpeed", GetComponent<Rigidbody2D>().velocity.y);
		
		float move = Input.GetAxis ("Horizontal");
		
		anim.SetFloat("Speed", Mathf.Abs (move));
		
		GetComponent<Rigidbody2D>().velocity = new Vector2(move * maxSpeed, GetComponent<Rigidbody2D>().velocity.y);
		
		anim.SetBool ("Wall", touchingWall);
		
		if (touchingWall) 
		{
			grounded = false; 
			doubleJump = false;
		}
		
		// If the input is moving the player right and the player is facing left...
		if(move > 0 &&!facingRight){
			// ... flip the player.
			Flip ();
		}// Otherwise if the input is moving the player left and the player is facing right...
		else if(move < 0 && facingRight){
			// ... flip the player.
			Flip ();
		}
	}//end FixedUpdate
	void Update()
	{
		
		// If the jump button is pressed and the player is grounded then the player should jump.
		if (numberOfFriends < 2) {
			if(grounded && Input.GetButtonDown("Jump"))
			{
				anim.SetBool("Ground", false);
				GetComponent<Rigidbody2D>().AddForce(new Vector2(0, jumpForce));
			}
		}//end number of friends is 0
		
		//double jump
		if (numberOfFriends >= 2) {
			if((grounded || !doubleJump) && Input.GetButtonDown("Jump"))
			{
				anim.SetBool("Ground", false);
				GetComponent<Rigidbody2D>().AddForce(new Vector2(0, jumpForce));
				
				if(!doubleJump && !grounded)
				{
					doubleJump = true;
				}
			}
		}//end number of friends is 2
		
		//wall boost
		if (touchingWall && numberOfFriends >=1 && Input.GetButtonDown ("Jump")) 
		{
			WallJump ();
		}
		
		if (numberOfFriends >= 3){
			jumpForce = 800f;
		}//end number of friends is 3
		
	}//end update
	
	void WallJump () 
	{
		Debug.Log( transform.localScale.x );
		GetComponent<Rigidbody2D>().velocity = new Vector2(jumpPushForce * -transform.localScale.x, 10);
		//rigidbody2D.AddForce (new Vector2 (jumpPushForce * -transform.localScale.x, jumpForce));
		
		//touchingWall = false;
	}//end walljump
	
	
	void Flip(){
		
		// Switch the way the player is labelled as facing
		facingRight = !facingRight;
		
		//Multiply the player's x local cale by -1
		Vector3 theScale = transform.localScale;
		theScale.x *= -1;
		transform.localScale = theScale;
	}//end flip
	
	void OnTriggerEnter2D(Collider2D who){
		// Assuming all colliders for bounce zone are tagged
		if(who.tag == "jumpPad"){
			///////////// Rigidbody 2D
			Vector2 nVel = this.GetComponent<Rigidbody2D>().velocity;
			nVel.y = 25f;
			this.GetComponent<Rigidbody2D>().velocity = nVel;
			//this.rigidbody2D.AddForce(new Vector2(0f, 800f));
		}
		if(who.tag == "wallPad"){
			///////////// Rigidbody 2D
			this.GetComponent<Rigidbody2D>().AddForce(new Vector2(800000f, jumpForce));
		}
		
		if(who.tag == "ceilingPad"){
			///////////// Rigidbody 2D
			this.GetComponent<Rigidbody2D>().AddForce(new Vector2(0f, -800f));
		}
	}
}