/*global define*/

define(
    function () {
        "use strict";

        var WIDTH = 16,
            PLAYER = 1,
            COMPUTER = 0,
            SPEED = 128,
            LEFT = 24,
            RIGHT = 128 - 24,
            TOP = 8,
            BOTTOM = 120,
            BOARD = [
                [ [ LEFT, TOP ], [ RIGHT, TOP ] ],
                [ [ LEFT, BOTTOM ], [ RIGHT, BOTTOM ] ],
                [ [ LEFT, TOP ], [ LEFT, BOTTOM ] ],
                [ [ RIGHT, TOP ], [ RIGHT, BOTTOM ] ]
            ],
            PALETTE = [ undefined, 'white', 'gray' ];
            
  
        function Round(context) {
            var score = [ 0, 0 ],
                paddles = [ [ 54, 16 ], [ 54, 112 ] ];

            function clamp(paddle) {
                return [
                    Math.min(Math.max(paddle[0], LEFT), RIGHT - WIDTH),
                    paddle[1]
                ];
            }

            function gray(display) {
                display.color = 2;
                display.palette = PALETTE;
                return display;
            }

            function line(segment) {
                return { line: segment };
            }

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

                paddles = paddles.map(clamp);

                state.display = paddles.map(display).concat(
                    BOARD.map(line).map(gray)
                );
            }

            return { update: update };
            
        }
        
        return Round;
    }
);
