/**
 * create global event listener for first level, where a modal gets triggered 
 */

 // we assume this script is within the phaser script

sprite.checkWorldBounds = true; 

playerSprite.events.onOutOfBounds.add(levelOnePaywall, this);

function levelOnePaywall() {
    
}