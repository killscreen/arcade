/*global define*/

define(
    function () {
        "use strict";

        var KEYS = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                Z: 90,
                X: 88
            },
            TRIGGERS = [ "Z", "X" ],
            DIRECTIONS = [ [ "LEFT", "RIGHT" ], [ "UP", "DOWN" ] ],
            INITIAL = {
                on: false,
                fire: false,
                click: false
            },
            INITIALS = TRIGGERS.map(function () { return INITIAL; });
        
        function Controller(keyboard) {
            function pressed(key) {
                return keyboard.pressed(KEYS[key]);
            }

            function direction(keys) {
                return keys.map(function (key, index) {
                    return pressed(key) ? 0 : (index * 2 - 1);
                }).reduce(function (a, b) {
                    return a + b;
                }, 0);
            }

            function trigger(prior, index) {
                var on = pressed(TRIGGERS[index]);
                return {
                    on: on,
                    fire: on && !prior.on,
                    click: !on && prior.fire
                };
            }

            return {
                update: function (state) {
                    var prior = state.controller || {};

                    state.controller = {
                        direction: DIRECTIONS.map(direction),
                        triggers: (prior.triggers || INITIALS).map(trigger)
                    };
                }
            };

        }

        return Controller;
    }
);
