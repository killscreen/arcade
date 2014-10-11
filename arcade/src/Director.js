/*global define*/

define(
    ['./Context'],
    function (Context) {
        "use strict";

        function Director() {
            var identifiers = [],
                scenes = {},
                counter = 0;
            
            function unique() {
                counter = counter + 1;
                return 'id' + counter;
            }
            
            return {
                scene: function () {
                    return scenes[identifiers[identifiers.length - 1]];
                },
                conclude: function (identifier) {
                    if (scenes[identifier]) {
                        identifiers.splice(identifiers.indexOf(identifier));
                        delete scenes[identifier];
                    }
                },
                run: function (Scene) {
                    var identifier = unique(),
                        context = new Context(this, identifier),
                        scene = new Scene(context);
                    scenes[identifier] = scene;
                    identifiers.push(identifier);
                    return;
                }
            };
        }
   
        return Director;
    }
);
