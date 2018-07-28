/**
 * create global event listener for first level, where a modal gets triggered 
 */

// we assume this script is within the phaser script
sprite.checkWorldBounds = true;

playerSprite.events.onOutOfBounds.add(levelOnePaywall, this);

/**
 * modal initialization]
 */

/* Instantiating iziModal */
$(".prompt-modal").iziModal({
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)'
});

function levelOnePaywall() {
    $('.prompt-modal').iziModal('open');
}


