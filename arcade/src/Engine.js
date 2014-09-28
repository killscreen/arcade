/*global define*/

define(
    function () {
        "use strict";
    
        function Engine(engines) {
            return {
                update: function (state) {
                    engines.forEach(function (engine) {
                        engines.update(state);
                    });
                }
            };        
        }

        return Engine;
    }
);
