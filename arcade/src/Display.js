/*global define*/

define(
    function () {
        "use strict";

        function Display(screen) {

            function render(display) {
                if (Array.isArray(display)) {
                    display.forEach(render);
                } else {
                    screen.draw(
                        display.sprite, 
                        display.position, 
                        display.palette
                    );   
                }
            }

            return {
                update: function (state) {
                    screen.clear();
                    render(state.display || []);
                }
            };

        }

        return Display;

    }
);
