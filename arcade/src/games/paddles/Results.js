/*global define*/

define(
    function () {
        "use strict";

        var TITLE = {
                text: "FINAL SCORE",
                height: 12,
                position: [ 64 - 32, 48 ]
            },
            MESSAGE = {
                text: "- PRESS FIRE -",
                height: 8,
                position: [ 64 - 32, 80 ]
            };

        function Results(context) {
            
            function on(trigger) {
                return trigger.fire;
            }
            
            function offset(value) {
                return value + 10;
            }
            
            function result(message) {
                return {
                    text: message || "",
                    height: 8,
                    position: [ 64 - 54, 100 ]
                };
            }
            
            function update(state) {
                var now = (state.time || {}).game || 0,
                    blink = (Math.round(now * 2) % 2) === 0;
                                
                state.display = [
                    TITLE,
                    blink ? [] : MESSAGE
                ];
                
                if (state.controller.triggers[0].fire) {
                    context.conclude();
                }
            }

            return { update: update };
        }

        return Results;
    }
);
