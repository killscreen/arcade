/*global define,document,window*/

define(
    [
        'require',        
        './Screen',
        './Display',
        './Driver',
        './Engine',
        './Game',
        './Clock',
        './Keyboard',
        './Controller'
    ],
    function (require, Screen, Display, Driver, Engine, Game, Clock, Keyboard, Controller) {
        "use strict";
        
        var scene = window.location.search.substring(1) || "Paddles";

        function run(Scene) {
            var canvas = document.getElementById('screen'),
                screen = new Screen(canvas),
                display = new Display(screen),
                keyboard = new Keyboard(document),
                controller = new Controller(keyboard),
                engine = new Engine([
                    new Clock(),
                    display,
                    controller,
                    new Game(Scene)
                ]),
                driver = new Driver(engine, window, 20);

            driver.start();
        }

        require(['games/' + scene.toLowerCase() + '/' + scene], run); 
    }
);
