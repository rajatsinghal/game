var grid = [
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

var solved_grid = [
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

var attempts = 0;
var can_attempt = false;
var seconds_left = 180;

function toggle(r, c) {
    if (grid[r][c]) {
        var val = '#FFFFFF';
    } else {
        var val = '#008080';
    }
    var id = '#r' + r + 'c' + c;
    $(id).css('background-color', val);
    grid[r][c] = 1 - grid[r][c];
}

function checkIfSolved() {
    var solved = true;
    $.each(grid, function(i, inner_array) {
        $.each(inner_array, function(j, val) {
            if(val != solved_grid[i][j])
                solved = false;
        });
    });
    return solved;
}

function startCountDown() {
    updateDisplayTimeLeft();
    $("#time_left").show();
    setTimeout(function(){updateCountDown()},1000);
}

function updateCountDown() {
    if(can_attempt)
        seconds_left--;
    if(seconds_left == 0)
        setTimeOver();
    updateDisplayTimeLeft();
    if(can_attempt)
        setTimeout(function(){updateCountDown()},1000);
}

function setTimeOver() {
    can_attempt = false;
    $("#grid").hide();
    $("#time_over").show();
}

function updateDisplayTimeLeft() {
    var minutes_left = parseInt(seconds_left / 60);
    var f_seconds_left = seconds_left % 60;
    var time_left_string = '';
    if(minutes_left <= 9)
        minutes_left = "0" + minutes_left;
    if(f_seconds_left <= 9)
        f_seconds_left = "0" + f_seconds_left;    
    time_left_string = minutes_left + ':' + f_seconds_left;
    time_left_string = time_left_string + ' left';
    $("#time_left").html(time_left_string);
}

$(document).ready(function(){
    $("#start_game").click(function() {
        can_attempt = true;
        $(this).hide();
        $("#attempts").show();
        startCountDown();
        return false;
    });

    $('td').click(function(){
        if (can_attempt && ($(this).hasClass('space') || $(this).hasClass('dot'))) {
            var r = $(this).attr('id').substring(1, 2);
            var c = $(this).attr('id').substring(3, 4);
            toggle(Number(r) - 1, c);
            toggle(r, Number(c) - 1);
            toggle(r, Number(c) + 1);
            toggle(Number(r) + 1, c);
            attempts++;
            $("#attempts_count").text(attempts);
            if(checkIfSolved()) {
                can_attempt = false;
                $("#grid").hide();
                $("#completed").show();
            }
        }
    });
});
