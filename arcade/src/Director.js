/*global define*/

define(
    ['./Context'],
    function (Context) {
        "use strict";

        function Director() {
            var fulfills = [], scenes = [];
            
            function executor(fulfill) {
                fulfills.push(fulfill);
            }

            return {
                scene: function () {
                    return scenes[scenes.length - 1];
                },
                conclude: function (index, message) {
                    var fulfill = fulfills[index];
                    fulfills.splice(index);
                    scenes.splice(index);
                    fulfill(message);
                },
                run: function (Scene, message) {
                    var context = new Context(this, fulfills.length),
                        scene = new Scene(message);
                    scenes.push(scene);
                    return new Promise(executor);
                }
            };
        }
   
        return Director;
    }
);
