var sound = new Audio("/barcode.wav");
var $result = document.getElementById('result');
$(document).ready(function() {

  barcode.config.start = 0.1;
  barcode.config.end = 0.9;
  barcode.config.video = '#barcodevideo';
  barcode.config.canvas = '#barcodecanvas';
  barcode.config.canvasg = '#barcodecanvasg';
  
  barcode.setHandler(function(barcode) {
    console.log(barcode)
    $result.innerHTML = barcode;
    $('#barcode-button').focus()
  });
  barcode.init();
  
  $('#result').bind('DOMSubtreeModified', function(e) {
    sound.play();	
  });
  
});