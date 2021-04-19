class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }
    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('newship', './assets/newship.png');
        this.load.image('gun', './assets/gun.png');
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('bluesky', './assets/bluesky.png');
        this.load.image('top', './assets/top.png');
        this.load.image('down', './assets/down.png');
        this.load.image('left', './assets/left.png');
        this.load.image('right', './assets/right.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 5});
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm', './assets/bgm.wav');

    }
    create(){
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'bluesky').setOrigin(0, 0);
        this.music = this.sound.add('bgm');
        this.music.loop = true;
        this.music.play();
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.supership = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*10, 'newship', 0, 20).setOrigin(0,0);
        this.supership.moveSpeed *= 2;
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x666666).setOrigin(0, 0);
        
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.image(0, 0, 'top').setOrigin(0, 0);
        this.add.image(0, borderUISize, 'left').setOrigin(0, 0);
        this.add.image(game.config.width - borderUISize, borderUISize, 'right').setOrigin(0, 0);
        this.add.image(0, game.config.height - borderUISize, 'down').setOrigin(0, 0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
          this.timeleft = this.add.text(game.config.width - 20 * borderPadding - borderUISize, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
          this.scoreright = this.add.text(game.config.width - 10 * borderPadding - borderUISize, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
          this.fire = this.add.text(borderUISize + 12 * borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
          this.fire.alpha = 0;
          this.fire.text = 'FIRE'
          this.scoreright.text = game.settings.hightscore;
          this.gameOver = false;
          scoreConfig.fixedWidth = 0;
          this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
              this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
              this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
              if(this.p1Score > game.settings.hightscore){
                game.settings.hightscore = this.p1Score;
              }
              this.gameOver = true;
            }, null, this);
            this.speedup = this.time.delayedCall(30000, () => {
                this.ship01.moveSpeed += (this.ship01.moveSpeed > 0? 2 : -2);
                this.ship02.moveSpeed += (this.ship02.moveSpeed > 0? 2 : -2);
                this.ship03.moveSpeed += (this.ship03.moveSpeed > 0? 2 : -2);
                this.supership.moveSpeed += (this.supership.moveSpeed > 0? 2 : -2);
              }, null, this);
    }
    update(){
        if(this.p1Rocket.isFiring){
            this.fire.alpha = 1;
        }else{
            this.fire.alpha = 0;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.music.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.music.stop();
            if(game.settings.is_novice){
                novice_hightscore = game.settings.hightscore;
            }else{
                expert_hightscore = game.settings.hightscore;
            }
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 2;
        this.timeleft.text = Math.ceil(this.clock.getRemainingSeconds());
        if (!this.gameOver) {               
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.supership.update();
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.clock.delay += 1000;
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.clock.delay += 1000;
          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.clock.delay += 1000;
          }
          if(this.checkCollision(this.p1Rocket, this.supership)) {
            this.p1Rocket.reset();
            this.shipExplode(this.supership);
            this.clock.delay += 2000;
          }
          for(let bullet of this.p1Rocket.bullets){
            if(this.checkCollision(bullet, this.ship03)) {
              bullet.alive = false;
              this.shipExplode(this.ship03);
              this.clock.delay += 1000;
            }
            if (this.checkCollision(bullet, this.ship02)) {
              bullet.alive = false;
              this.shipExplode(this.ship02);
              this.clock.delay += 1000;
            }
            if (this.checkCollision(bullet, this.ship01)) {
              bullet.alive = false;
              this.shipExplode(this.ship01);
              this.clock.delay += 1000;
            }
            if(this.checkCollision(bullet, this.supership)) {
              bullet.alive = false;
              this.shipExplode(this.supership);
              this.clock.delay += 2000;
            }
          }

    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
          ship.reset();
          ship.alpha = 1;
          boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'+ Math.floor(Math.random() * 5));
      }

}

