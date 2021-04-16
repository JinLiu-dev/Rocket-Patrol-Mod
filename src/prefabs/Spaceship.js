class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.points = pointValue;
        this.moveSpeed = Math.floor(Math.random() * 2)? game.settings.spaceshipSpeed: -game.settings.spaceshipSpeed;
        if(this.moveSpeed < 0){
            this.flipX = true;
        }
    }

    update() {
        this.x -= this.moveSpeed;
        if(this.moveSpeed > 0){
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        }else{
            if(this.x >= game.config.width + this.width) {
                this.reset();
            }
        }

    }


    reset() {
        if(this.moveSpeed > 0){
            this.x = game.config.width + 50;
        }else{
            this.x =  0 - this.width;
        }
        
    }
}