/*global define*/

define(
    ['./Results', "./Level", "./Conclusion"],
    function (Results, Level, Conclusion) {
        "use strict";

        var WIDTH = 32,
            EDGE = 4,
            PLAYER = 0,
            SPEED = 122,
            LEFT = 8,
            RIGHT = 120,
            TOP = 8,
            FONT = 8,
            BOTTOM = 128 - 16,
            MIDDLE = (TOP + BOTTOM) / 2,
            TILT = 4,
            SLOW = 0.25,
            BOARD = [
                [ [ LEFT, TOP ], [ RIGHT, TOP ] ],
                [ [ LEFT, BOTTOM ], [ RIGHT, BOTTOM ] ],
                [ [ LEFT, TOP ], [ LEFT, BOTTOM ] ],
                [ [ RIGHT, TOP ], [ RIGHT, BOTTOM ] ]
            ],
            GOALS = [ TOP, BOTTOM ],
            STEP = 1 / SPEED,
            GRAVITY = 96,
            PALETTE = [ undefined, 'white', 'gray' ],
            COLORS = [ 'red', 'purple', 'blue', 'cyan', 'green', 'yellow' ];
        
  
        function Round(context) {
            var initialized = false,
                lives,
                level,
                bricks,
                ball,
                velocity,
                movement,
                waiting = WIDTH / 4,
                tilt = -1,
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
                            LEFT + width * brick[0] + 0.5,
                            start + height * brick[2]
                        ],
                        [
                            LEFT + width * (brick[0] + brick[1]) - 0.5,
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
                    0,
                    -SPEED
                ];

                initialized = true;
            }

            function other() { 
                return [ paddles[0][0] + WIDTH / 2 + waiting, paddles[0][1] ];
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
                    line: [ 
                        [ paddle[0], paddle[1] + tilt * TILT ], 
                        [ paddle[0] + WIDTH, paddle[1] - tilt * TILT ] 
                    ] 
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
                velocity[1] += GRAVITY * delta;
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

            function launch(depth) {
                var center = paddles[0][0] + WIDTH / 2,
                    burst = Math.abs(depth - waiting) / (WIDTH * 3 / 4);
                ball = other();
                waiting = depth;        
                velocity[0] *= -SLOW;
                velocity[0] += movement / 2;
                velocity[0] += tilt * (1 - burst) * WIDTH;       
                velocity[1] = -SPEED * burst;
                tilt *= -1;
            }

            function collide(paddle) {
                var center = paddle[0] + WIDTH / 2,
                    edge = center + WIDTH / 2 * tilt,
                    tilted = ball[0] * tilt;
                
                if (tilted >= center * tilt && tilted <= edge * tilt) {
                    if (ball[1] <= paddle[1] + 1 && ball[1] >= paddle[1] - 1) {
                        launch((tilted - center * tilt) * tilt);
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
                    direction = state.controller.direction[0];
                
                movement = direction * (SPEED / 2);
                paddles[PLAYER][0] += movement * delta;
                paddles = paddles.map(clamp);

                while (delta > 0) {
                    move(Math.min(STEP, delta));
                    bounce();
                    if (velocity[1] >= 0) {
                        paddles.forEach(collide);
                    }
                    bricks = bricks.filter(miss);
                    delta -= STEP;
                }

                if (concluded(state)) {
                    context.conclude();
                    context.run(level < 100 && lives > -1 ? Round : Conclusion);
                }
                state.message = { lives: lives, level: level };

                state.display = paddles.map(display).concat(
                    BOARD.map(line).map(gray)
                ).concat([draw(ball), draw(other())]).concat([
                    { text: "LEVEL " + level, position: [ 8, 122 ] },
                    { text: "LIVES " + lives, position: [ 87, 122 ] }
                ]).concat(bricks);

            }

            return { update: update };
            
        }
        
        return Round;
    }
);
