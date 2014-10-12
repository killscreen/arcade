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
            GOALS = [ TOP, BOTTOM ],
            PALETTE = [ undefined, 'white', 'gray' ];
            
  
        function Round(context) {
            var initialized = false,
                ball,
                velocity,
                paddles = [ 
                    [ ( LEFT + RIGHT ) / 2 - WIDTH / 2, TOP + WIDTH / 2 ], 
                    [ ( LEFT + RIGHT ) / 2 - WIDTH / 2, BOTTOM - WIDTH / 2 ]
                ];

            function add(a, b) {
                return a + b;
            }

            function initialize(score) {
                var total = score.reduce(add, 0),
                    server = (total + 1) % 2,
                    direction = 1 - server * 2;

                ball = [ 
                    (LEFT + RIGHT) / 2,
                    GOALS[server] + direction * WIDTH * 3 / 4
                ];

                velocity = [
                    SPEED * direction,
                    SPEED * direction
                ];

                initialized = true;
            }

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

            function draw(ball) {
                return { 
                    line: [ ball, [ ball[0] + 1, ball[1] ] ] 
                };
            }


            function move(delta) {
                ball = [
                    ball[0] + velocity[0] * delta,
                    ball[1] + velocity[1] * delta
                ];
            }


            function bounce() {
                if (ball[0] <= LEFT + 1) {
                    velocity[0] = Math.abs(velocity[0]);
                }
                if (ball[0] >= RIGHT - 1) {
                    velocity[0] = -Math.abs(velocity[0]);
                }
                if (ball[1] <= TOP + 1) {
                    velocity[1] = Math.abs(velocity[1]);
                }
                if (ball[1] >= BOTTOM - 1) {
                    velocity[1] = -Math.abs(velocity[1]);
                }
            }

            function collide(paddle, index) {
                if (ball[0] >= paddle[0] && ball[1] <= paddle[1] + WIDTH) {
                    if (ball[1] <= paddle[1] + 1 && ball[1] >= paddle[1] - 1) {
                        velocity[1] = Math.abs(velocity[1]) * (1 - index * 2);
                    }
                }
            }

            function update(state) {
                var message = state.message || {},
                    score = message.score || [ 0, 0 ],
                    delta = state.time.delta || 0,
                    direction = state.controller.direction[0],
                    movement = direction * delta * SPEED;
                
                if (!initialized) {
                    initialize(score);
                }

                move(delta);
                bounce();
                paddles.forEach(collide);
                paddles[PLAYER][0] += movement;

                paddles = paddles.map(clamp);

                state.display = paddles.map(display).concat(
                    BOARD.map(line).map(gray)
                ).concat([draw(ball)]);
            }

            return { update: update };
            
        }
        
        return Round;
    }
);
