//Implemented features
// Track a high score that persists across scenes and display it in the UI (5) 
//   -at the upper left corner of the in-game UI

// Implement the 'FIRE' UI text from the original game (5)

// Add your own (copyright-free) background music to the Play scene (5)
//   -The bgm is composed by me.

// Implement the speed increase that happens after 30 seconds in the original game (5)

// Randomize each spaceship's movement direction at the start of each play (5)
//   -The direction of all ships is random (left or right)

// Create a new scrolling tile sprite for the background (5)
//   -used some CC0(no copyright) assets by Master484(http://m484games.ucoz.com/)

// Allow the player to control the Rocket after it's fired (5)

// Create 4 new explosion SFX and randomize which one plays on impact (10)
//   -all the 4 SFX are original, made by me.

// Display the time remaining (in seconds) on the screen (10)

// Replace the UI borders with new artwork (10)
//   -artwork used for the UI borders is also original

// Create a new animated sprite for the Spaceship enemies (10)
//   -used some CC0(no copyright) assets by scofanogd, Scrittl

// Implement parallax scrolling (10)

// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//   -used some CC0(no copyright) assets by Scrittl

// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)
//   -used some CC0(no copyright) assets by scofanogd, Scrittl, Sogomn

// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
//   -small spaceships + 2 seconds, big spaceships +1 second

// Implement mouse control for player movement and mouse click to fire (20)
//   -Players can use keyboard or mouse to play

// Create and implement a new weapon (w/ new behavior and graphics) (20)
//   -Q to switch the weapon(machine gun or rocket),machine gun shoots fast,
//   but its bullets are slow.

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