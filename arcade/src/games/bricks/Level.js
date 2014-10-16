/*global define*/

define(
    function () {
        "use strict";

        var VARIETIES = [
            function rows(difficulty) {
                var row = 0,
                    bricks = [];
                    
                for (row = 0; row < 8; row = row + 1) {
                    bricks.push([ row / 10, 0.25, row ]);
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
