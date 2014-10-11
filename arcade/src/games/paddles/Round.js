/*global define*/

define(
    function () {
        "use strict";
  
        function Round(context) {
            function update(state) {
                                
                if (state.controller.triggers[0].fire) {
                    state.message = "Pressed Z";
                    context.conclude();
                } else if (state.controller.triggers[1].fire) {
                    state.message = "Pressed X";
                    context.conclude();
                } else {
                    state.display = {
                        text: "Playing a game...",
                        height: 8,
                        position: [ 64 - 54, 80 ]
                    };
                }
                
            }

            return { update: update };
            
        }
        
        return Round;
    }
);
