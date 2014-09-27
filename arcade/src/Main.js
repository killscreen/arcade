/*global define,document*/

define(
    ['./Screen'],
    function (Screen) {
        var canvas = document.getElementById('screen'),
            screen = new Screen(canvas);

    }
);
