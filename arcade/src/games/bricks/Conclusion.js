/*global define*/

define(
    [],
    function () {
        "use strict";

        var TITLE = {
                height: 16,
                position: [ 64 - 44, 48 ]
            },
            MESSAGE = {
                text: "- PRESS FIRE -",
                height: 8,
                position: [ 64 - 34, 80 ]
            },
            WIN = "YOU WIN!",
            LOSE = "GAME OVER";

        function Bricks(context) {
            function title(text) {
                var title = Object.create(TITLE);
                title.text = text;
                return title;
            }

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
                    title(state.message.lives > -1 ? WIN : LOSE),
                    blink ? [] : MESSAGE
                ];
                
                if (state.controller.triggers[0].fire) {
                    context.conclude();
                }
            }

            return { update: update };
        }

        return Bricks;
    }
);
