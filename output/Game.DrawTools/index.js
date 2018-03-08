"use strict";
var Data_Function = require("../Data.Function");
var Data_Int = require("../Data.Int");
var Data_Number_Format = require("../Data.Number.Format");
var Data_Semigroup = require("../Data.Semigroup");
var PrestoDOM_Core = require("../PrestoDOM.Core");
var PrestoDOM_Elements = require("../PrestoDOM.Elements");
var PrestoDOM_Properties = require("../PrestoDOM.Properties");
var PrestoDOM_Types = require("../PrestoDOM.Types");
var PrestoDOM_Types_DomAttributes = require("../PrestoDOM.Types.DomAttributes");

//draw function
var drawCars = function (state) {
    return function (car) {
        return PrestoDOM_Elements.linearLayout([ PrestoDOM_Properties.id_(car.id), PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(100)), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(100)), PrestoDOM_Properties.orientation("horizontal"), PrestoDOM_Properties.gravity("center"), PrestoDOM_Properties.margin(Data_Number_Format.toString(Data_Int.toNumber(car.x)) + ("," + (Data_Number_Format.toString(Data_Int.toNumber(car.y)) + ",0,0"))) ])([ PrestoDOM_Elements.imageView([ PrestoDOM_Properties.width(new PrestoDOM_Types_DomAttributes.V(150)), PrestoDOM_Properties.height(new PrestoDOM_Types_DomAttributes.V(150)), PrestoDOM_Properties.margin("0,0,0,0"), PrestoDOM_Properties.imageUrl("assets/opcar") ]) ]);
    };
};
module.exports = {
    drawCars: drawCars
};
