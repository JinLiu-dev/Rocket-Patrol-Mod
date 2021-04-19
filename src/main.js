let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene:[Menu, Play],
}
let keyF, keyR, keyQ, keyLEFT, keyRIGHT;
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let novice_hightscore = 0;
let expert_hightscore = 0;