class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.sfxRocket = scene.sound.add('sfx_rocket');
      scene.add.existing(this);
      this.movementSpeed = 2;
      this.isFiring = false;
      this.mousemove = false;
      this.buttondown = false;
      this.weapon = 0;
      this.bullets = [];
      
    }
    update(){
        if(this.isFiring) {
            if(this.weapon === 0){
                this.y -= this.movementSpeed;
                if(this.y <= borderUISize * 3 + borderPadding) {
                    this.reset();
                }
            }else if(this.weapon === 1){
                this.isFiring = false;
                this.bullets.push(new Bullet(this.scene, this.x, this.y - 2, 'bullet').setOrigin(0.5, 0));
            }
        }
        for (var i = 0; i < this.bullets.length; i++) {
                this.bullets[i].update();
            　　if (this.bullets[i].alive == false) {
                   this.bullets[i].destroy();
                   this.bullets.splice(i, 1);
            　　　　i--; 
            　　}
        }
        if(keyLEFT.isDown) {
            this.mousemove = false;
            this.x -= this.movementSpeed;
            }
        if(Phaser.Input.Keyboard.JustDown(keyQ)) {
            if(this.weapon === 0){
                this.weapon = 1;
                this.reset();
                this.setTexture('gun');
            }else{
                this.weapon = 0;
                this.reset();
                this.setTexture('rocket');
            }
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

        if(Phaser.Input.Keyboard.JustDown(keyF) || this.scene.input.mousePointer.leftButtonDown() && !this.buttondown) {
                this.isFiring = true;
                this.buttondown = true;
                this.sfxRocket.play();
            }
        if(this.scene.input.mousePointer.leftButtonReleased()){
            this.buttondown = false;
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

  class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 1;
        this.alive = true;
      }
      update(){
        this.y -= this.movementSpeed;
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.alive = false;
        }
      }

  }