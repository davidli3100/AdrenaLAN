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
var codeBool = false;


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }


  $("#code-input").on('keyup', function (e) {
    if (e.keyCode == 13) {
        if ($('#code-input').val == "BATTLEFRONT") {
            codeCorrect();
        }
        else if ($('#code-input').val != "BATTLEFRONT") {
            codeIncorrect($('#code-input').val)
        }
    }
});

  $( "#checkCodeBtn" ).click(function() {
    if ($('#code-input').val == "BATTLEFRONT") {
        codeCorrect();s
    }
    else if ($('#code-input').val != "BATTLEFRONTs") {
        codeIncorrect($('#code-input').val)
    }s
  });

function checkCode(codeInputVal) {
    codeInputVal = $("#code-input").val();
    if (codeInputVal == "BATTLEFRONT") {
        codeBool = true;
        codeCorrect()
    } else {
        codeBool = false;
        codeIncorrect(codeInputVal);
    }
}

function codeCorrect() {
    toastr.success("Great job! You've entered the correct  code. \n Sending you to the next level...", 'Success!');

}

function codeIncorrect(incorrectCode) {

    // init alert
    console.log(incorrectCode);
    toastr.error("Oops! The code " + incorrectCode + " is incorrect! Please try again...", 'Uh oh');
}

function exitToMain() {
    iframe = window.parent.document.querySelector('iframe');
    iframe.setAttribute('src', '/levelOne');
}
