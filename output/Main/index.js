"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var DOM = require("../DOM");
var Data_Array = require("../Data.Array");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Int = require("../Data.Int");
var Data_Number_Format = require("../Data.Number.Format");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Data_Unit = require("../Data.Unit");
var FRP = require("../FRP");
var FRP_Behavior = require("../FRP.Behavior");
var FRP_Behavior_Keyboard = require("../FRP.Behavior.Keyboard");
var FRP_Event = require("../FRP.Event");
var FRP_Event_Time = require("../FRP.Event.Time");
var Game_DrawTools = require("../Game.DrawTools");
var Game_Types = require("../Game.Types");
var Game_Values = require("../Game.Values");
var Prelude = require("../Prelude");
var PrestoDOM_Core = require("../PrestoDOM.Core");
var PrestoDOM_Elements = require("../PrestoDOM.Elements");
var PrestoDOM_Properties = require("../PrestoDOM.Properties");
var PrestoDOM_Types = require("../PrestoDOM.Types");
var PrestoDOM_Types_DomAttributes = require("../PrestoDOM.Types.DomAttributes");
var PrestoDOM_Util = require("../PrestoDOM.Util");
var view = function (state) {
    return PrestoDOM_Elements.linearLayout([ PrestoDOM_Properties.height(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.width(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.background("#ffffff"), PrestoDOM_Properties.name("rootNode"), PrestoDOM_Properties.orientation("Horizontal") ])([ PrestoDOM_Elements.relativeLayout([ PrestoDOM_Properties.height(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(1000)), PrestoDOM_Properties.background("#ffffff"), PrestoDOM_Properties.orientation("vertical"), PrestoDOM_Properties.gravity("center") ])([ PrestoDOM_Elements.relativeLayout([ PrestoDOM_Properties.height(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(1000)), PrestoDOM_Properties.background("#ffffff"), PrestoDOM_Properties.orientation("vertical") ])(Data_Functor.map(Data_Functor.functorArray)(Game_DrawTools.drawCars(state))(state.cars)), PrestoDOM_Elements.linearLayout([ PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(100)), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(100)), PrestoDOM_Properties.orientation("horizontal"), PrestoDOM_Properties.background("#0000ff"), PrestoDOM_Properties.gravity("center"), PrestoDOM_Properties.margin(Data_Number_Format.toString(Data_Int.toNumber(state.myCar.x)) + ("," + (Data_Number_Format.toString(Data_Int.toNumber(state.myCar.y)) + ",0,0"))) ])([ PrestoDOM_Elements.imageView([ PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(150)), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(150)), PrestoDOM_Properties.margin("0,0,0,0"), PrestoDOM_Properties.imageUrl("assets/mycar") ]) ]) ]), PrestoDOM_Elements.linearLayout([ PrestoDOM_Properties.height(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.width(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.background("#000000"), PrestoDOM_Properties.orientation("vertical"), PrestoDOM_Properties.gravity("centerHorizontal") ])([ PrestoDOM_Elements.linearLayout([ PrestoDOM_Properties.width(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(40)), PrestoDOM_Properties.background("#ff0000"), PrestoDOM_Properties.gravity("center") ])([ PrestoDOM_Elements.textView([ PrestoDOM_Properties.width(PrestoDOM_Types_DomAttributes.Match_Parent.value), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(40)), PrestoDOM_Properties.text(Data_Show.show(Data_Show.showString)(state.gameMsg)), PrestoDOM_Properties.gravity("center"), PrestoDOM_Properties.textSize("28") ]) ]), PrestoDOM_Elements.textView([ PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(100)), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(40)), PrestoDOM_Properties.color("#000000"), PrestoDOM_Properties.text("Score:" + Data_Show.show(Data_Show.showInt)(state.score / 10 | 0)), PrestoDOM_Properties.textSize("28") ]) ]) ]);
};

//accelerate positive=accel, neg=decelerat, 0=normal
var getNewPos = function (state) {
    return function (accelerate) {
        return Data_Functor.map(Data_Functor.functorArray)(function (n) {
            return {
                id: n.id,
                x: (function () {
                    var $4 = n.y === (-100 | 0);
                    if ($4) {
                        return (200 * ((n.x + state.elapsed | 0) % 4 + 1 | 0) | 0) - 175 | 0;
                    };
                    return n.x;
                })(),
                y: (function () {
                    var $5 = n.y > 530;
                    if ($5) {
                        return -200 | 0;
                    };
                    var $6 = accelerate === 1;
                    if ($6) {
                        return n.y + (Game_Values.carSpeed * 2 | 0) | 0;
                    };
                    var $7 = accelerate === (-1 | 0);
                    if ($7) {
                        return n.y + (Game_Values.carSpeed / 2 | 0) | 0;
                    };
                    return n.y + Game_Values.carSpeed | 0;
                })()
            };
        })(state.cars);
    };
};

//produce cars
var getCars = function (a) {
    return function __do() {
        var lane = Control_Monad_Eff_Random.randomInt(1)(4)();
        return {
            id: "c" + Data_Number_Format.toString(Data_Int.toNumber(a)),
            x: (200 * lane | 0) - 175 | 0,
            y: 450 - (a * 250 | 0) | 0
        };
    };
};
var collided = function (mycar) {
    return function (opponent) {
        var $8 = mycar.x < (opponent.x + 100 | 0) && ((mycar.x + 100 | 0) >= opponent.x && (mycar.y < (opponent.y + 100 | 0) && (mycar.y + 100 | 0) >= opponent.y));
        if ($8) {
            return true;
        };
        return false;
    };
};
var collisionTest = function (state) {
    return Data_Array.filter(collided(state.myCar))(state.cars);
};

//main
var main = (function () {
    var validate = function (left) {
        return function (up) {
            return function (right) {
                return function (down) {
                    return function (oldState) {
                        if (oldState.gameOver === true) {
                            return oldState;
                        };
                        if (Data_Array["null"](collisionTest(oldState)) === false) {
                            return {
                                cars: oldState.cars,
                                myCar: oldState.myCar,
                                elapsed: oldState.elapsed,
                                score: oldState.score,
                                gameOver: true,
                                gameMsg: "Game Over!"
                            };
                        };
                        if (left || (right || (up || down))) {
                            return {
                                cars: (function () {
                                    if (up) {
                                        return getNewPos(oldState)(1);
                                    };
                                    if (down) {
                                        return getNewPos(oldState)(-1 | 0);
                                    };
                                    return getNewPos(oldState)(0);
                                })(),
                                myCar: (function () {
                                    if (left) {
                                        return {
                                            x: (function () {
                                                var $17 = oldState.myCar.x === 5;
                                                if ($17) {
                                                    return 5;
                                                };
                                                return oldState.myCar.x - 5 | 0;
                                            })(),
                                            y: oldState.myCar.y
                                        };
                                    };
                                    if (right) {
                                        return {
                                            x: (function () {
                                                var $19 = oldState.myCar.x === 895;
                                                if ($19) {
                                                    return 895;
                                                };
                                                return oldState.myCar.x + 5 | 0;
                                            })(),
                                            y: oldState.myCar.y
                                        };
                                    };
                                    return oldState.myCar;
                                })(),
                                elapsed: oldState.elapsed + 1 % 767 | 0,
                                score: oldState.score + 1 | 0,
                                gameOver: false,
                                gameMsg: oldState.gameMsg
                            };
                        };
                        if (Data_Boolean.otherwise) {
                            return {
                                cars: getNewPos(oldState)(0),
                                myCar: oldState.myCar,
                                elapsed: oldState.elapsed + 1 % 767 | 0,
                                score: oldState.score + 1 | 0,
                                gameOver: false,
                                gameMsg: oldState.gameMsg
                            };
                        };
                        throw new Error("Failed pattern match at Main line 64, column 5 - line 79, column 189: " + [ left.constructor.name, up.constructor.name, right.constructor.name, down.constructor.name, oldState.constructor.name ]);
                    };
                };
            };
        };
    };
    return function __do() {
        var v = Control_Monad_Eff_Console.log("Running")();
        var v1 = Data_Traversable.traverse(Data_Traversable.traversableArray)(Control_Monad_Eff.applicativeEff)(getCars)(Data_Array.range(1)(Game_Values.totalCars))();
        var myCar = {
            x: 225,
            y: 500
        };
        var initialState = {
            cars: v1,
            myCar: myCar,
            elapsed: 0,
            score: 0,
            gameOver: false,
            gameMsg: "CarRace 2D!"
        };
        var v2 = PrestoDOM_Util.render(view)(initialState)();
        var v3 = v2.updateState(Control_Apply.apply(FRP_Behavior.applyABehavior(FRP_Event.functorEvent))(Control_Apply.apply(FRP_Behavior.applyABehavior(FRP_Event.functorEvent))(Control_Apply.apply(FRP_Behavior.applyABehavior(FRP_Event.functorEvent))(Control_Apply.apply(FRP_Behavior.applyABehavior(FRP_Event.functorEvent))(Data_Functor.map(FRP_Behavior.functorABehavior(FRP_Event.functorEvent))(validate)(FRP_Behavior_Keyboard.key(37)))(FRP_Behavior_Keyboard.key(38)))(FRP_Behavior_Keyboard.key(39)))(FRP_Behavior_Keyboard.key(40)))(v2.stateBeh))(FRP_Event_Time.animationFrame)();
        return Data_Unit.unit;
    };
})();
module.exports = {
    getCars: getCars,
    collided: collided,
    collisionTest: collisionTest,
    getNewPos: getNewPos,
    main: main,
    view: view
};
