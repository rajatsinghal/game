function animateRoll(times) {
  times = times || 1;
  var roll = generateRoll();
  drawRoll(roll[0], roll[1]);
  if (times == 11) {
    return;
  }
  setTimeout('animateRoll(' + (times + 1) + ')', 200);
}

function generateRoll() {
  return [ Math.floor(Math.random()*6) + 1, Math.floor(Math.random()*6) + 1 ];
}

function drawRoll(die1, die2) {
  $('#die1').html('<img src="images/dice_' + die1 +'.gif" />');
  $('#die2').html('<img src="images/dice_' + die2 +'.gif" />');
}