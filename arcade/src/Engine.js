/*global define*/

define(
    function () {
        "use strict";
    
        function Engine(engines) {
            return {
                update: function (state) {
                    engines.forEach(function (engine) {
                        try {
                            engine.update(state);
                        } catch (exception) {
                            console.log(exception);
                        }
                    });
                }
            };
        }

        return Engine;
    }
);
