/*global define*/

define(
    function () {
        "use strict";

        function Context(director, index) {
            return {
                conclude: function (message) {
                    return director.conclude(index, message);
                },
                run: function (Scene, message) {
                    return director.run(Scene, message);
                }
            };
        }
   
        return Context;
    }
);
