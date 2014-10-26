/*global define*/

define(
    ['./Round'],
    function (Round) {
        "use strict";

        var TITLE = {
                text: "FULCRUM",
                height: 16,
                position: [ 64 - 34, 48 ]
            },
            MESSAGE = {
                text: "- PRESS FIRE TO START -",
                height: 8,
                position: [ 64 - 54, 80 ]
            };

        function Fulcrum(context) {
            
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
                    state.message = {
                        lives: 3,
                        level: 1
                    };
                    context.run(Round);
                }
            }

            return { update: update };
        }

        return Fulcrum;
    }
);
