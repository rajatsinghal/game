function animateRoll(times) {
  times = times || 1;
  var roll = generateRoll();
  drawRoll(roll[0], roll[1]);
  if (times == 11) {
    showResult(roll[0], roll[1]);
    return;
  }
  setTimeout('animateRoll(' + (times + 1) + ')', 200);
}

function generateRoll() {
  return [ Math.floor(Math.random()*6) + 1, Math.floor(Math.random()*6) + 1 ];
}

function drawRoll(dice1, dice2) {
  $('#die1').html('<img src="images/dice_' + dice1 +'.gif" />');
  $('#die2').html('<img src="images/dice_' + dice2 +'.gif" />');
}

function showResult(dice1, dice2) {
  $('#sum').html('Total: '+(dice1 + dice2));
}