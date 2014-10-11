/*global define*/

define(
    function () {
        "use strict";

        function Context(director, identifier) {
            return {
                conclude: function () {
                    director.conclude(identifier);
                },
                run: function (Scene) {
                    director.run(Scene);
                }
            };
        }
   
        return Context;
    }
);
