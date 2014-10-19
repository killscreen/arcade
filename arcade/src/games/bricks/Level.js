/*global define*/

define(
    function () {
        "use strict";

        var ROWS = 12,
            VARIETIES = [
                function rows(difficulty) {
                    var row = 0,
                        count = Math.min(3 + difficulty, ROWS),
                        scale = Math.max(difficulty - ROWS + 7, 3),
                        step = 1 / scale,
                        x = 0,
                        bricks = [];
                        
                    for (row = 0; row < count; row = row + 1) {
                        for (x = 0; x + step <= 1 + step / 2; x = x + step) {
                            bricks.push([ x, step, row ]);
                        }
                    }

                    return bricks;
                },
                function (difficulty) {
                    var row = 0,
                        count = Math.min(3 + difficulty * 5, ROWS),
                        scale = Math.max(difficulty - ROWS / 4 + 7, 3),
                        step = 1 / scale,
                        offset = step / 2,
                        x = 0,
                        bricks = [];
                        
                    for (row = 0; row < count; row = row + 1) {
                        for (x = row * offset; x + step <= 1 - row * offset + step / 2; x = x + step) {
                            bricks.push([ x, step, row ]);
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
