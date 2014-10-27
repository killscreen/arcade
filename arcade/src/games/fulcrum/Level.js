/*global define*/

define(
    function () {
        "use strict";

        var ROWS = 16,
            VARIETIES = [
                function pyramid(difficulty) {
                    var row = 0,
                        count = Math.min(3 + difficulty * 5, ROWS),
                        scale = Math.max(difficulty - ROWS / 4 + 7, 3),
                        step = 1 / scale,
                        offset = step / 2,
                        x = 0,
                        bricks = [];
                        
                    for (row = 0; row < count; row = row + 1) {
                        for (x = row * offset; x + step <= 1 - row * offset + step / 2; x = x + step) {
                            bricks.push([ x, step, ROWS - row - 1 ]);
                        }
                    }

                    return bricks;
                },
                function rows(difficulty) {
                    var row = 0,
                        count = Math.min(3 + difficulty, ROWS),
                        scale = Math.max(difficulty - ROWS + 7, 3),
                        step = 0.8 / scale,
                        x = 0.1,
                        bricks = [];
                        
                    for (row = 0; row < count; row = row + 1) {
                        for (x = 0.1; x + step <= 0.9 + step / 2; x = x + step) {
                            bricks.push([ x, step, ROWS - row - 1 ]);
                        }
                    }

                    return bricks;
                },
                function gaps(difficulty) {
                    var row = 0,
                        count = Math.min(4 + difficulty, ROWS),
                        scale = Math.max(difficulty + 4, 3),
                        step = 1 / scale,
                        x = 0,
                        offset = (difficulty % 2) * step,
                        bricks = [];
                        
                    for (row = 0; row < count; row = row + 1 + (row % 3)) {
                        for (x = 0; x + step < 1 - step / 2; x = x + step) {
                            bricks.push([ x + offset, step, ROWS - row - 1 ]);
                        }
                    }

                    return bricks;
                },
                function diamonds(difficulty) {
                    var row = 0,
                        start = 2 + Math.floor(difficulty / 5),
                        height = 3 + Math.floor(difficulty / 5),
                        count = Math.min(3 + difficulty, ROWS),
                        scale = Math.round(Math.max(difficulty + 5, 5) * 1.5),
                        step = 1 / scale,
                        left,
                        x = 0,
                        counter = 0,
                        bricks = [];
                        
                    for (row = 0; row < height; row = row + 1) {
                        counter = 0;
                        left = Math.max(row, height - row) * step;
                        for (x = left; x + step <= 1 - left + step / 2; x = x + step) {
                            bricks.push([ x, step, ROWS - row - start - 1 ]);
                        }
                    }

                    return bricks;
                }

            ];

        function Level(level) {
            var type = level % VARIETIES.length,
                difficulty = Math.floor((level - type) / VARIETIES.length);

            function bricks() {
                return VARIETIES[type](difficulty);
            }

            return {
                bricks: bricks
            };
        }

        return Level;
    }
);
