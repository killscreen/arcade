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
                },
                sequence: function (Scenes, message) {
                    var i;

                    function next(message) {
                        var j = i;
                        i = i + 1;
                        return j < Scenes.length ?
                                director.run(Scenes[i++], message).then(next),
                                message;                                
                    }
    
                    return next(message);
                }
            };
        }
   
        return Context;
    }
);
