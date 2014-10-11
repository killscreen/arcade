/*global define*/

define(
    function () {
        "use strict";
    
        function Driver(engine, window, interval) {
            var state = {},
                active;

            function drive() {
                engine.update(state);
            }

            return {
                start: function () {
                    active = window.setInterval(drive, interval);
                },
                stop: function () {
                    window.clearInterval(active);
                }
            };
        }

        return Driver;
    }
);
