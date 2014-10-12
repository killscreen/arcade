/*global define*/

define(
    ['./Round'],
    function (Round) {
        "use strict";

        var TITLE = {
                text: "PADDLES",
                height: 16,
                position: [ 64 - 32, 48 ]
            },
            MESSAGE = {
                text: "- PRESS FIRE TO START -",
                height: 8,
                position: [ 64 - 54, 80 ]
            };

        function Paddles(context) {
            
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
                    blink ? [] : MESSAGE,
                    result(state.message)
                ];
                
                if (state.controller.triggers[0].fire) {
                    context.run(Round);
                }
            }

            return { update: update };
        }

        return Paddles;
    }
);
