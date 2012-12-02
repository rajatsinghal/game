var point = 0;
   
     function animateRoll(times)
     {
         times = times || 1;
         
         var roll = generateRoll();
         drawRoll(roll[0], roll[1]);
         
         if (times > 10)
         {
               checkRoll(roll[0], roll[1]);
               return;
         }
         
         setTimeout('animateRoll(' + (times + 1) + ')', 200);
     }

     function generateRoll()
     {
         return [ Math.floor(Math.random()*6) + 1, Math.floor(Math.random()*6) + 1 ];
     }

     function drawRoll(die1, die2)
     {
         document.getElementById('die1').innerHTML = '<img src="images/dice_' + die1 +'.gif" />';
         document.getElementById('die2').innerHTML = '<img src="images/dice_' + die2 +'.gif" />';
     }

     function checkRoll(die1, die2)
     {
         var sum = die1 + die2;
         document.getElementById("sum").innerHTML = "= &nbsp;&nbsp;&nbsp;"+sum;
      
      if(point == 0) {  // if this is the come-out roll:
         switch (sum) {
            case 2:
            case 3:
            case 12:
               clr = "red";
               msg = "Sorry!  You Crapped Out!  Roll Again";
               point = 0;
               break;
            case 7:
            case 11:
               clr = "green";
               msg = "You Win!  "+sum+" Is A Natural!";
               point = 0;
               break;
            default:
               clr = "black";
               msg = "Roll Again.  Your Point Is "+sum;
               point = sum;
         }
      } else {  // this is NOT the come-our roll:
         switch (sum) {
            case 7:
               clr = "red";
               msg = "Sorry, You Crapped Out!  Next Roll";
               point = 0;
               break;
            case point:
               clr = "green";
               msg = "Congratulations!  You Made Your Point!";
               point = 0;
               break;
            default:
               clr = "black";
               msg = "Your Point Is "+point+".  Roll Again";
         }
      }
      document.getElementById("roll").style.color=clr;
      document.getElementById("roll").innerHTML=msg;
   }