/*global define*/

define(
    function () {
        "use strict";

        var WIDTH = 16,
            PLAYER = 1,
            COMPUTER = 0,
            SPEED = 128;
            
  
        function Round(context) {
            var score = [ 0, 0 ],
                paddles = [ [ 120, 16 ], [ 120, 112 ] ];

            function display(paddle) {
                return {
                    line: [ paddle, [ paddle[0] + WIDTH, paddle[1] ] ]
                };
            }

            function update(state) {
                var message = state.message || {},
                    score = message.score || [ 0, 0 ],
                    delta = state.time.delta || 0,
                    direction = state.controller.direction[0],
                    movement = direction * delta * SPEED;
                
                paddles[PLAYER][0] += movement;

                state.display = paddles.map(display);
            }

            return { update: update };
            
        }
        
        return Round;
    }
);
