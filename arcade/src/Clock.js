/*global define*/

define(
    function () {
        "use strict";

        function Clock() {
            var first = Date.now() / 1000,
                previous = first;

            function update(state) {
                var now = Date.now() / 1000;
                state.time = {
                    now: now,
                    game: now - first,
                    delta: now - previous
                };
                previous = now;
            };

            return { update: update };
        }

        return Clock;
    }
);
