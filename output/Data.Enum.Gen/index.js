// Generated by purs version 0.11.7
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Monad_Gen = require("../Control.Monad.Gen");
var Data_Bounded = require("../Data.Bounded");
var Data_Enum = require("../Data.Enum");
var Data_Foldable = require("../Data.Foldable");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Unfoldable = require("../Data.Unfoldable");
var Prelude = require("../Prelude");
var genBoundedEnum = function (dictMonadGen) {
    return function (dictBoundedEnum) {
        var v = Data_Enum.succ(dictBoundedEnum.Enum1())(Data_Bounded.bottom(dictBoundedEnum.Bounded0()));
        if (v instanceof Data_Maybe.Just) {
            var possibilities = Data_Enum.enumFromTo(dictBoundedEnum.Enum1())(Data_Unfoldable.unfoldableArray)(v.value0)(Data_Bounded.top(dictBoundedEnum.Bounded0()));
            return Control_Monad_Gen.elements(dictMonadGen)(Data_Foldable.foldableArray)(new Data_NonEmpty.NonEmpty(Data_Bounded.bottom(dictBoundedEnum.Bounded0()), possibilities));
        };
        if (v instanceof Data_Maybe.Nothing) {
            return Control_Applicative.pure((dictMonadGen.Monad0()).Applicative0())(Data_Bounded.bottom(dictBoundedEnum.Bounded0()));
        };
        throw new Error("Failed pattern match at Data.Enum.Gen line 13, column 3 - line 18, column 12: " + [ v.constructor.name ]);
    };
};
module.exports = {
    genBoundedEnum: genBoundedEnum
};