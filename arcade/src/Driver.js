/*global define*/

define(
    function () {
        "use strict";
    
        function Driver(engine, window, interval) {
            var state = {},
                interval;

            function drive() {
                engine.update(state);
            }

            return {
                start: function () {
                    interval = window.setInterval(drive, interval);
                },
                stop: function () {
                    window.clearInterval(interval);
                }
            };        
        }

        return Driver;
    }
);
