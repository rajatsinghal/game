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
    [ 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
];

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

$(document).ready(function(){
    $('td').click(function(){
        if ($(this).hasClass('space') || $(this).hasClass('dot')) {
            var r = $(this).attr('id').substring(1, 2);
            var c = $(this).attr('id').substring(3, 4);
            toggle(Number(r) - 1, c);
            toggle(r, Number(c) - 1);
            toggle(r, Number(c) + 1);
            toggle(Number(r) + 1, c);
        }
    });
});
