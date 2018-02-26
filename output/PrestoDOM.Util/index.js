// Generated by purs version 0.11.7
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var DOM = require("../DOM");
var DOM_Node_Types = require("../DOM.Node.Types");
var Data_Function = require("../Data.Function");
var Data_Unit = require("../Data.Unit");
var FRP = require("../FRP");
var FRP_Behavior = require("../FRP.Behavior");
var FRP_Event = require("../FRP.Event");
var Halogen_VDom = require("../Halogen.VDom");
var Halogen_VDom_DOM = require("../Halogen.VDom.DOM");
var Halogen_VDom_Machine = require("../Halogen.VDom.Machine");
var Prelude = require("../Prelude");
var PrestoDOM_Core = require("../PrestoDOM.Core");
var PrestoDOM_Properties = require("../PrestoDOM.Properties");
var PrestoDOM_Types = require("../PrestoDOM.Types");
var updateState = function (stateFn) {
    return function (beh) {
        return function (event) {
            return FRP_Event.subscribe(FRP_Behavior.sample_(FRP_Event.eventIsEvent)(beh)(event))(function (newState) {
                return function __do() {
                    var v = $foreign.logNode(newState)();
                    return stateFn(newState)();
                };
            });
        };
    };
};
var signal = function (name) {
    return function (eventType) {
        return function (initialValue) {
            return function __do() {
                var v = FRP_Event.create();
                var behavior = FRP_Behavior.step(FRP_Event.eventIsEvent)(initialValue)(v.event);
                var x = $foreign.attachSignalEvents(name)(eventType)(v.push);
                return {
                    behavior: behavior,
                    event: v.event
                };
            };
        };
    };
};
var patchAndRun = function (state) {
    return function (myDom) {
        return function __do() {
            var v = $foreign.getLatestMachine();
            var v1 = Halogen_VDom_Machine.step(v)(myDom(state))();
            return $foreign.storeMachine(v1)();
        };
    };
};
var getEvent = function (v) {
    return v.value0.event;
};
var getBeh = function (v) {
    return v.value0.beh;
};
var buildAttributes = function (elem) {
    var done = function (attrs) {
        return $foreign.cleanupAttributes(elem)(attrs);
    };
    var patch = function (attrs1) {
        return function (attrs2) {
            return function __do() {
                var v = $foreign.patchAttributes(elem)(attrs1)(attrs2)();
                return new Halogen_VDom_Machine.Step(Data_Unit.unit, patch(v), done(v));
            };
        };
    };
    var apply = function (attrs) {
        return function __do() {
            var v = $foreign.applyAttributes(elem)(attrs)();
            return new Halogen_VDom_Machine.Step(Data_Unit.unit, patch(v), done(v));
        };
    };
    return apply;
};
var spec = function (document) {
    return {
        buildWidget: Data_Function["const"](Halogen_VDom_Machine.never(Control_Monad_Eff.applicativeEff)),
        buildAttributes: buildAttributes,
        document: document
    };
};
var render = function (dom) {
    return function (state) {
        return function __do() {
            var v = $foreign.getRootNode();
            var v1 = Halogen_VDom_DOM.buildVDom(spec(v))(dom(state))();
            $foreign.storeMachine(v1)();
            $foreign.insertDom(v)(Halogen_VDom_Machine.extract(v1))();
            var v2 = FRP_Event.create();
            var stateBeh = FRP_Behavior.step(FRP_Event.eventIsEvent)(state)(v2.event);
            var v3 = FRP_Event.subscribe(FRP_Behavior.sample_(FRP_Event.eventIsEvent)(stateBeh)(v2.event))(function (x) {
                return patchAndRun(x)(dom);
            })();
            return {
                updateState: updateState(v2.push),
                stateBeh: stateBeh
            };
        };
    };
};
module.exports = {
    buildAttributes: buildAttributes,
    spec: spec,
    render: render,
    updateState: updateState,
    patchAndRun: patchAndRun,
    signal: signal,
    getBeh: getBeh,
    getEvent: getEvent,
    logNode: $foreign.logNode,
    applyAttributes: $foreign.applyAttributes,
    done: $foreign.done,
    patchAttributes: $foreign.patchAttributes,
    cleanupAttributes: $foreign.cleanupAttributes,
    getLatestMachine: $foreign.getLatestMachine,
    storeMachine: $foreign.storeMachine,
    getRootNode: $foreign.getRootNode,
    insertDom: $foreign.insertDom,
    attachSignalEvents: $foreign.attachSignalEvents,
    initializeState: $foreign.initializeState
};