const socket = io()
var prev;
var sound = new Audio("/barcode.wav");

socket.on('rfid-tag', async (rfid) => {
  if(rfid != prev) {
    prev = rfid;
    var $input = document.getElementById('rfid');
    $input.value = rfid;
    document.querySelector('button').focus();
  }

})

$('#rfid').bind('DOMSubtreeModified', function(e) {
  sound.play();	
});