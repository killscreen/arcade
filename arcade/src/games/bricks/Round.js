/*global define*/

define(
    ['./Results'],
    function (Results) {
        "use strict";

        var WIDTH = 16,
            PLAYER = 0,
            SPEED = 64,
            LEFT = WIDTH / 2,
            RIGHT = 128 - WIDTH / 2,
            TOP = WIDTH / 2,
            FONT = 8,
            BOTTOM = 128 - WIDTH,
            MIDDLE = (TOP + BOTTOM) / 2,
            BOUNCE = 1.025,
            BOARD = [
                [ [ LEFT, TOP ], [ RIGHT, TOP ] ],
                [ [ LEFT, BOTTOM ], [ RIGHT, BOTTOM ] ],
                [ [ LEFT, TOP ], [ LEFT, BOTTOM ] ],
                [ [ RIGHT, TOP ], [ RIGHT, BOTTOM ] ]
            ],
            GOALS = [ TOP, BOTTOM ],
            STEP = 1 / SPEED,
            PALETTE = [ undefined, 'white', 'gray' ];
        
  
        function Round(context) {
            var initialized = false,
                lives,
                level,
                ball,
                velocity,
                paddles = [ 
                    [ ( LEFT + RIGHT ) / 2 - WIDTH / 2, BOTTOM - WIDTH / 2 ]
                ];

            function add(a, b) {
                return a + b;
            }

            function initialize(message) {
                lives = message.lives;
                level = message.level;

                ball = [ 
                    (LEFT + RIGHT) / 2,
                    BOTTOM - WIDTH * 3 / 4
                ];

                velocity = [
                    -SPEED * 4 / 3,
                    -SPEED * 4 / 3
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
                    velocity[1] = Math.abs(velocity[0]);
                }
            }

            function collide(paddle) {
                if (ball[0] >= paddle[0] && ball[0] <= paddle[0] + WIDTH) {
                    if (ball[1] <= paddle[1] + 1 && ball[1] >= paddle[1] - 1) {
                        velocity[1] = -Math.abs(velocity[1]);
                    }
                }
            }

            function text(total, index) {
                return {
                    text: String(total),
                    height: FONT,
                    position: [ 
                        LEFT - WIDTH / 2, 
                        GOALS[index] + FONT * (1 - index) - 1
                    ]
                };
            }

            function check(score, index) {
                var goal = GOALS[1 - index],
                    top = index === 1,
                    collide = top ? (ball[1] < GOALS[0]) : (ball[1] > GOALS[1]);

                if (collide) {
                    initialized = false;
                    return score + 1;
                } else {
                    return score;
                }
            }



            function update(state) {
                var message = state.message || {},
                    initializer = initialized || initialize(message),
                    delta = state.time.delta || 0,                    
                    time = state.time.game || 0,
                    sign = velocity[1] > 0,
                    direction = [
                        state.controller.direction[0],
                    ],
                    movement = [
                        direction[0] * delta * SPEED,
                    ];
                
                paddles[PLAYER][0] += movement[0];
                paddles = paddles.map(clamp);

                while (delta > 0) {
                    move(Math.min(STEP, delta));
                    bounce();
                    paddles.forEach(collide);
                    delta -= STEP;
                }

                if ((velocity[1] > 0) !== sign) {
                    velocity[1] *= BOUNCE;
                }

                state.message = { lives: lives, level: level };

                state.display = paddles.map(display).concat(
                    BOARD.map(line).map(gray)
                ).concat([draw(ball)]).concat([
                    { text: "LEVEL " + level, position: [ 8, 122 ] },
                    { text: "LIVES " + lives, position: [ 87, 122 ] }
                ]);

            }

            return { update: update };
            
        }
        
        return Round;
    }
);
