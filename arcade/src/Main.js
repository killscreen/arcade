/*global define,document*/

define(
    ['./Screen', './Display'],
    function (Screen, Display) {
        var canvas = document.getElementById('screen'),
            screen = new Screen(canvas),
            display = new Display(screen);

        display.update({
            display: [
                { line: [ [ 10, 20 ], [ 40, 20 ] ] } 
            ]
        });

    }
);
