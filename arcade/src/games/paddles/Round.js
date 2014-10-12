/*global define*/

define(
    ['./Results'],
    function (Results) {
        "use strict";

        var WIDTH = 16,
            PLAYER = 1,
            COMPUTER = 0,
            SPEED = 64,
            LEFT = 24 + WIDTH / 4,
            RIGHT = 128 - 24 + WIDTH / 4,
            TOP = 8,
            FONT = 8,
            BOTTOM = 120,
            MIDDLE = (TOP + BOTTOM) / 2,
            BOUNCE = 1.025,
            BOARD = [
                [ [ LEFT, TOP ], [ RIGHT, TOP ] ],
                [ [ LEFT, BOTTOM ], [ RIGHT, BOTTOM ] ],
                [ [ LEFT, TOP ], [ LEFT, BOTTOM ] ],
                [ [ RIGHT, TOP ], [ RIGHT, BOTTOM ] ]
            ],
            DASH = (RIGHT - LEFT) / 16,
            DASHES = [],
            GOALS = [ TOP, BOTTOM ],
            STEP = 1 / SPEED,
            PALETTE = [ undefined, 'white', 'gray' ];
        
        while (DASHES.length < 8) {
            DASHES.push([
                [ LEFT + DASHES.length * DASH * 2 + DASH / 2, MIDDLE ],
                [ LEFT + DASHES.length * DASH * 2 + DASH * 3 / 2, MIDDLE ]
            ]);
        }
  
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
                    SPEED * direction * 4 / 3,
                    SPEED * direction * 4 / 3
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
            }

            function collide(paddle, index) {
                if (ball[0] >= paddle[0] && ball[0] <= paddle[0] + WIDTH) {
                    if (ball[1] <= paddle[1] + 1 && ball[1] >= paddle[1] - 1) {
                        velocity[1] = Math.abs(velocity[1]) * (1 - index * 2);
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

            function predict(vertical, inaccuracy) {
                var remaining = (vertical - ball[1]) / velocity[1],
                    predicted = ball[0] + velocity[0] * remaining;

                predicted += inaccuracy * (ball[1] - vertical);

                if (predicted < LEFT) {
                    predicted = LEFT + LEFT - predicted;
                }

                if (predicted > RIGHT) {
                    predicted = RIGHT + RIGHT - predicted;
                }

                return predicted;               
            }

            function think(paddle, time, difficulty) {
                var left = paddle[0],
                    right = paddle[0] + WIDTH,
                    inaccuracy = Math.sin(time) / difficulty,
                    prediction = predict(paddle[1], inaccuracy);

                return prediction < left ? -1 :
                        prediction > right ? 1 :
                        0;
            }

            function update(state) {
                var message = state.message || {},
                    score = message.score || [ 0, 0 ],
                    initializer = initialized || initialize(score),
                    delta = state.time.delta || 0,                    
                    time = state.time.game || 0,
                    sign = velocity[1] > 0,
                    direction = [
                        state.controller.direction[0],
                        think(paddles[COMPUTER], time, 0.5 + score[1] / 3)
                    ],
                    movement = [
                        direction[0] * delta * SPEED,
                        direction[1] * delta * SPEED
                    ];
                
                paddles[PLAYER][0] += movement[0];
                paddles[COMPUTER][0] += movement[1];
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

                score = score.map(check);
                state.message = { score: score };

                state.display = paddles.map(display).concat(
                    BOARD.concat(DASHES).map(line).map(gray)
                ).concat([draw(ball)]).concat(score.map(text));

                if (score[0] >= 2 || score[1] >= 2) {
                    context.conclude();
                    context.run(Results);
                }
            }

            return { update: update };
            
        }
        
        return Round;
    }
);
