/*global define*/

define(
    function () {
        "use strict";

        var TITLE = {
                text: "FINAL SCORE",
                height: 12,
                position: [ 64 - 40, 48 ]
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
                var score = (message || {}).score || [];
                return {
                    text: score[1] + '-' + score[0],
                    height: 8,
                    position: [ 64 - 8, 66 ]
                };
            }
            
            function winner(message) {
                var score = (message || {}).score || [],
                    winner = score[1] > score[0] ? "PLAYER" : "COMPUTER",
                    message = winner + " WINS";
                return {
                    text: message,
                    height: 12,
                    position: [ 64 - message.length * 3.66, 88 ]
                };
            }

            function update(state) {
                var now = (state.time || {}).game || 0,
                    blink = (Math.round(now * 2) % 2) === 0,
                    message = state.message;
                                
                state.display = [
                    TITLE,
                    blink ? [] : winner(message),
                    result(message)
                ];
                
                if (state.controller.triggers[0].fire) {
                    delete state.message;
                    context.conclude();
                }
            }

            return { update: update };
        }

        return Results;
    }
);
