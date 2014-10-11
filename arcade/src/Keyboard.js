/*global define*/

define(
    function () {
        "use strict";
        
        function Keyboard(document) {
            var keys = {};

            function down(event) {
                keys[event.keyCode] = true;
            }

            function up(event) {
                keys[event.keyCode] = false;
            }

            document.addEventListener('keydown', down);
            document.addEventListener('keyup', up);

            return {
                pressed: function (code) {
                    return keys[code] || false;
                }
            };

        }

        return Keyboard;
    }
);
