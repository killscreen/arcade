/*global define*/

define(
    ['./Results', "./Level", "./Conclusion"],
    function (Results, Level, Conclusion) {
        "use strict";

        var WIDTH = 20,
            EDGE = 4,
            PLAYER = 0,
            SPEED = 64,
            LEFT = WIDTH / 2,
            RIGHT = 128 - WIDTH / 2,
            TOP = WIDTH / 2,
            FONT = 8,
            BOTTOM = 128 - WIDTH,
            MIDDLE = (TOP + BOTTOM) / 2,
            BOUNCE = 1.0125,
            BOARD = [
                [ [ LEFT, TOP ], [ RIGHT, TOP ] ],
                [ [ LEFT, BOTTOM ], [ RIGHT, BOTTOM ] ],
                [ [ LEFT, TOP ], [ LEFT, BOTTOM ] ],
                [ [ RIGHT, TOP ], [ RIGHT, BOTTOM ] ]
            ],
            GOALS = [ TOP, BOTTOM ],
            STEP = 1 / SPEED,
            PALETTE = [ undefined, 'white', 'gray' ],
            COLORS = [ 'red', 'purple', 'blue', 'cyan', 'green', 'yellow' ];
        
  
        function Round(context) {
            var initialized = false,
                lives,
                level,
                bricks,
                ball,
                velocity,
                paddles = [ 
                    [ ( LEFT + RIGHT ) / 2 - WIDTH / 2, BOTTOM - WIDTH / 2 ]
                ];


            function reposition(brick) {
                var width = RIGHT - LEFT,
                    start = TOP + 4,
                    height = 4;

                return {
                    box: [
                        [
                            LEFT + width * brick[0],
                            start + height * brick[2] 
                        ],
                        [
                            LEFT + width * (brick[0] + brick[1]) - 1,
                            start + height * brick[2] + height - 1
                        ]
                    ],
                    color: brick[2] % COLORS.length,
                    palette: COLORS
                };
            }

            function initialize(message) {
                lives = message.lives;
                level = message.level;
                bricks = bricks || new Level(level).bricks().map(reposition);

                ball = [ 
                    (LEFT + RIGHT) / 2,
                    BOTTOM - WIDTH * 3 / 4
                ];

                velocity = [
                    -SPEED,
                    -SPEED
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

            function hit(brick) {
                var edge = (velocity[0] > 0) ? 
                            (ball[0] < brick.box[0][0] + 1) :
                            (ball[0] > brick.box[1][0] - 1);
            }

            function miss(brick) {
                var missed = (ball[0] < brick.box[0][0]) ||
                            (ball[0] > brick.box[1][0]) ||
                            (ball[1] < brick.box[0][1]) ||
                            (ball[1] > brick.box[1][1]);

                return missed || hit(brick);                    
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
            }

            function collide(paddle) {
                if (ball[0] >= paddle[0] && ball[0] <= paddle[0] + WIDTH) {
                    if (ball[1] <= paddle[1] + 1 && ball[1] >= paddle[1] - 1) {
                        velocity[1] = -Math.abs(velocity[1]);
                        if (ball[0] < paddle[0] + EDGE) {
                            velocity[0] -= SPEED / 3;
                        }
                        if (ball[0] > paddle[0] + WIDTH - EDGE) {
                            velocity[0] += SPEED / 3;
                        }
                    }
                }
            }

            function concluded(state) {
                if (state.controller.triggers[0].fire) {
                    level += 1;                
                    return true;
                }
                if (ball[1] > BOTTOM) {
                    lives -= 1;
                    initialized = false;
                    return lives < 0;
                }
                if (bricks.length < 1) {
                    level += 1;
                    lives += Math.floor(level / 10);
                    lives = Math.min(lives, 9);
                    return true;
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
                    bricks = bricks.filter(miss);
                    delta -= STEP;
                }

                if ((velocity[1] > 0) !== sign) {
                    velocity[1] *= BOUNCE;
                }

                if (concluded(state)) {
                    context.conclude();
                    context.run(level < 100 && lives > -1 ? Round : Conclusion);
                }
                state.message = { lives: lives, level: level };

                state.display = paddles.map(display).concat(
                    BOARD.map(line).map(gray)
                ).concat([draw(ball)]).concat([
                    { text: "LEVEL " + level, position: [ 8, 122 ] },
                    { text: "LIVES " + lives, position: [ 87, 122 ] }
                ]).concat(bricks);

            }

            return { update: update };
            
        }
        
        return Round;
    }
);
