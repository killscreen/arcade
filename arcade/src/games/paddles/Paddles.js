/*global define*/

define(
    function () {
        "use strict";

        var TITLE = { line: [ [64, 32], [96, 16] ] };

        function Paddles(context, message) {
            function update(state) {
                var now = (state.time || {}).scene || 0,
                    blink = (Math.round(now * 2) % 2) === 0;
                console.log(now, blink);
                state.display = blink ? [] : TITLE;
            }

            return { update: update };
        }

        return Paddles;
    }
);
