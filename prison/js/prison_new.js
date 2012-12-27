var prisonGame = function() {
    var game = this;
    game.initGame = function() {
        game.prisons = [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        ];
        game.all_prisons_open = [
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
        ];
        game.attempts = 0;
        game.can_attempt = false;
        game.seconds_left = 180;
    }
    game.start = function() {
        game.can_attempt = true;
        $(this).hide();
        game.showAttempts();
        game.startCountDown();
    }
    game.checkIfPrisonOrCornerAndAttemptIfAllowed = function(element) {
        if(game.can_attempt && ($(element).hasClass('space') || $(element).hasClass('dot'))) {
            var r = $(element).attr('id').substring(1, 2);
            var c = $(element).attr('id').substring(3, 4);
            game.prisonOrCornerClicked(r, c);            
        }
    }
    game.prisonOrCornerClicked = function (r, c) {
        game.togglePrison(Number(r) - 1, c);
        game.togglePrison(r, Number(c) - 1);
        game.togglePrison(r, Number(c) + 1);
        game.togglePrison(Number(r) + 1, c);
        game.updateAttempts();
        game.renderAttempts();
        if(game.checkIfSolved()) {
            game.setSolved();                
        }
    }
    game.togglePrison = function (r, c) {
        if(game.prisons[r][c])
            openPrison(r, c);
        else
            closePrison(r, c);
        game.prisons[r][c] = 1 - game.prisons[r][c];
    }
    game.openPrison = function (r, c) {
        var prison_id = '#r' + r + 'c' + c;
        $(prison_id).css('background-color', '#FFFFFF');    
    }
    game.closePrison = function (r, c) {
        var prison_id = '#r' + r + 'c' + c;
        $(prison_id).css('background-color', '#008080');
    } 
    game.checkIfSolved = function () {
        var solved = true;
        $.each(game.prisons, function(i, inner_array) {
            $.each(inner_array, function(j, val) {
                if(val != game.all_prisons_open[i][j])
                    solved = false;
            });
        });
        return solved;
    }
    game.renderAttempts = function() {
        $("#attempts_count").text(game.attempts);
    }
    game.showAttempts = function() {
        $("#attempts").show();
    }
    game.updateAttempts = function() {
        game.attempts++;
    }
    game.renderTimeLeft = function () {
        var minutes_left = parseInt(game.seconds_left / 60);
        var f_seconds_left = game.seconds_left % 60;
        var time_left_string = '';
        if(minutes_left <= 9)
            minutes_left = "0" + minutes_left;
        if(f_seconds_left <= 9)
            f_seconds_left = "0" + f_seconds_left;    
        time_left_string = minutes_left + ':' + f_seconds_left;
        time_left_string = time_left_string + ' left';
        $("#time_left").html(time_left_string);
    }
    game.showTimeLeft = function() {
        $("#time_left").show();
    }
    game.startCountDown = function () {
        game.renderTimeLeft();
        game.showTimeLeft();
        setTimeout(function(){game.updateCountDown()},1000);
    }
    game.updateCountDown = function () {
        if(game.can_attempt)
            game.seconds_left--;
        if(game.seconds_left == 0)
            game.setTimeOver();
        game.renderTimeLeft();
        if(game.can_attempt)
            setTimeout(function(){game.updateCountDown()},1000);
    }
    game.setTimeOver = function () {
        game.can_attempt = false;
        $("#grid").hide();
        $("#time_over").show();
    }
    game.setSolved = function () {
        game.can_attempt = false;
        $("#grid").hide();
        $("#completed").show();
    }    
};


$(document).ready(function(){
    var prison_game = new prisonGame();
    prison_game.initGame();
    $("#start_game").click(function() {
        prison_game.start();    
        return false;
    });
    $('td').click(function(){
        prison_game.checkIfPrisonOrCornerAndAttemptIfAllowed(this);
    });
});
