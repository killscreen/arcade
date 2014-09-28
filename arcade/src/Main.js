/*global define,document*/

define(
    ['./Screen'],
    function (Screen) {
        var canvas = document.getElementById('screen'),
            screen = new Screen(canvas);

        screen.line([0, 0], [96, 64]);
        screen.draw(
            [
                [ true, false, true ],
                [ true, false, false ],
                [ true, true, false ]
            ],
            [32, 72]
        );
    }
);
