/*global define*/

define(
    function () {
        "use strict";

        var ROWS = 12,
            VARIETIES = [
                function rows(difficulty) {
                    var row = 0,
                        count = Math.min(3 + difficulty, ROWS),
                        scale = Math.max(difficulty - ROWS + 3, 3),
                        step = 1 / scale,
                        x = 0,
                        bricks = [];
                        
                    for (row = 0; row < count; row = row + 1) {
                        for (x = 0; x + step <= 1; x = x + step) {
                            bricks.push([ x, step, row ]);
                        }
                    }

                    return bricks;
                },
                function (difficulty) {
                    return [
                        [ 0, 0.5, 1 ]
                    ];
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
