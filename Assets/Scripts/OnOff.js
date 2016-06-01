 #pragma strict

public var onSprite:Sprite;
public var offSprite:Sprite;

private var sRenderer:SpriteRenderer;

function Start () {
	sRenderer = this.GetComponent("SpriteRenderer");
	sRenderer.sprite = offSprite;
}

@RPC
function TurnOn() {
	sRenderer.sprite = onSprite;
}

@RPC
function TurnOff() {
	sRenderer.sprite = offSprite;
}

function Update () {

}