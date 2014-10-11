/*global define*/

define(
    function () {
        "use strict";

        var TITLE = { line: [ [64, 32], [96, 16] ] };

        function Paddles(context, message) {
            
            function on(trigger) {
                return trigger.on;
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
                    blink ? [] : TITLE,
                    depict(state.controller || {})
                ];
            }

            return { update: update };
        }

        return Paddles;
    }
);
