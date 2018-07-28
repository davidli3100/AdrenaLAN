/**
 * this is to initiate the paywall and next level functions of the routing
 */

$(".prompt-modal").iziModal({
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)'
  });

  $(".code-unlock-modal").iziModal({
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)'
  });


    $('.prompt-modal').iziModal('open');

  function loadCodeUnlock() {
    $('.code-unlock-modal').iziModal('open');
  }

  function codeCorrect() {
    $('.code.unlock-modal').iziModal('hide');
  }

var incorrectCode = document.getElementById('#codeInput').value;
const popupAlert = document.getElementById('.popupAlert')
var codeBool = false;


function checkCode(codeInputVal) {
    if (codeInputVal == "BATTLEFRONT") {
        codeBool = true;
        codeIncorrect(codeInputVal)
    }

    else {
        codeBool = false;
    }
}  

function codeCorrect(correctCode) {
    
}

function codeIncorrect(incorrectCode) {

    // init alert
    console.log(incorrectCode)
    popupAlert.innerHTML("The Code " + incorrectCode + "is incorrect. Please try again. ")
    
  }