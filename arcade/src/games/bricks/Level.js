/*global define*/

define(
    function () {
        "use strict";

        var VARIETIES = [
            function rows(difficulty) {
                return [
                    [ 0, 0.5, 1 ]
                ];
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
