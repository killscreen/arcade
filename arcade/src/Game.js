/*global define*/

define(
    ["./Director"],
    function (Director) {
        "use strict";

        function Game(Scene) {
            var director = new Director();

            function update(state) {
                director.scene().update(state);
            }

            director.run(Scene);

            return { update: update };
        }

        return Game;
    }
);
