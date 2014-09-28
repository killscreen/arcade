/*global define,document,window*/

define(
    ['./Screen', './Display', './Driver', './Engine', './Game', './Clock', 'games/paddles/Paddles'],
    function (Screen, Display, Driver, Engine, Game, Clock, Paddles) {
        var canvas = document.getElementById('screen'),
            screen = new Screen(canvas),
            display = new Display(screen),
            engine = new Engine([
                new Clock(),
                new Game(Paddles),
                display
            ]),
            driver = new Driver(engine, window, 20);

        driver.start();

        display.update({
            display: [
                { line: [ [ 10, 20 ], [ 100, 20 ] ] } 
            ]
        });

    }
);
