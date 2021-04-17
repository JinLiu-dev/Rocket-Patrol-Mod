class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.sfxRocket = scene.sound.add('sfx_rocket');
      scene.add.existing(this);
      this.movementSpeed = 2;
      this.isFiring = false;
      this.mousemove = false;
      
    }
    update(){
        //console.log();
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y <= borderUISize * 3 + borderPadding) {
                this.reset();
            }
        }
        //console.log(this.scene.input.mousePointer.x);
        if(keyLEFT.isDown) {
            this.mousemove = false;
            this.x -= this.movementSpeed;
            }
        if(keyRIGHT.isDown) {
            this.mousemove = false;
            this.x += this.movementSpeed;
            }
        if(this.scene.input.mousePointer.velocity.x != 0){
            this.mousemove = true;
        }
        if(this.mousemove){
            if(this.scene.input.x - this.x > 0){
                this.x += this.movementSpeed;
            }
            if(this.scene.input.x - this.x < 0){
                this.x -= this.movementSpeed;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyF) || this.scene.input.mousePointer.isDown) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
    
            this.x = Phaser.Math.Clamp(
                this.x,
                borderUISize + borderPadding,
                game.config.width - borderUISize - borderPadding);
        
}
reset() {
    this.isFiring = false;
    this.y = game.config.height-borderUISize-borderPadding;

}
  }
