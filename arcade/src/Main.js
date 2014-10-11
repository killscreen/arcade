/*global define,document,window*/

define(
    [
        './Screen',
        './Display',
        './Driver',
        './Engine',
        './Game',
        './Clock',
        './Keyboard',
        './Controller',
        'games/paddles/Paddles'
    ],
    function (Screen, Display, Driver, Engine, Game, Clock, Keyboard, Controller, Paddles) {
        "use strict";
        
        var canvas = document.getElementById('screen'),
            screen = new Screen(canvas),
            display = new Display(screen),
            keyboard = new Keyboard(document),
            controller = new Controller(keyboard),
            engine = new Engine([
                new Clock(),
                display,
                controller,
                new Game(Paddles)
            ]),
            driver = new Driver(engine, window, 20);

        driver.start();
    }
);
