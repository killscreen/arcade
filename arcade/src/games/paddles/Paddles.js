/*global define*/

define(
    function () {
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

        function Paddles(context, message) {
            
            function on(trigger) {
                return trigger.fire;
            }
            
            function offset(value) {
                return value + 10;
            }
            
            function depict(controller) {
                var triggers = controller.triggers || [],
                    direction = controller.direction || [ 0, 0 ];
                
                return {
                    sprite: [ triggers.map(on) ],
                    position: direction.map(offset)
                };
            }
            
            function update(state) {
                var now = (state.time || {}).scene || 0,
                    blink = (Math.round(now * 2) % 2) === 0;
                                
                state.display = [
                    TITLE,
                    blink ? [] : MESSAGE
                ];
            }

            return { update: update };
        }

        return Paddles;
    }
);
