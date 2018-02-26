// Generated by purs version 0.11.7
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_FunctorWithIndex = require("../Data.FunctorWithIndex");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Maybe_Last = require("../Data.Maybe.Last");
var Data_Monoid = require("../Data.Monoid");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Endo = require("../Data.Monoid.Endo");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative");
var Data_Newtype = require("../Data.Newtype");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Tuple = (function () {
    function Tuple(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Tuple.create = function (value0) {
        return function (value1) {
            return new Tuple(value0, value1);
        };
    };
    return Tuple;
})();
var FoldableWithIndex = function (Foldable0, foldMapWithIndex, foldlWithIndex, foldrWithIndex) {
    this.Foldable0 = Foldable0;
    this.foldMapWithIndex = foldMapWithIndex;
    this.foldlWithIndex = foldlWithIndex;
    this.foldrWithIndex = foldrWithIndex;
};
var foldrWithIndex = function (dict) {
    return dict.foldrWithIndex;
};
var traverseWithIndex_ = function (dictApplicative) {
    return function (dictFoldableWithIndex) {
        return function (f) {
            return foldrWithIndex(dictFoldableWithIndex)(function (i) {
                return function ($41) {
                    return Control_Apply.applySecond(dictApplicative.Apply0())(f(i)($41));
                };
            })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
        };
    };
};
var forWithIndex_ = function (dictApplicative) {
    return function (dictFoldableWithIndex) {
        return Data_Function.flip(traverseWithIndex_(dictApplicative)(dictFoldableWithIndex));
    };
};
var foldlWithIndex = function (dict) {
    return dict.foldlWithIndex;
};
var foldableWithIndexMultiplicative = new FoldableWithIndex(function () {
    return Data_Foldable.foldableMultiplicative;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableMultiplicative)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableMultiplicative)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableMultiplicative)(f(Data_Unit.unit));
});
var foldableWithIndexMaybe = new FoldableWithIndex(function () {
    return Data_Foldable.foldableMaybe;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableMaybe)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableMaybe)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableMaybe)(f(Data_Unit.unit));
});
var foldableWithIndexLast = new FoldableWithIndex(function () {
    return Data_Foldable.foldableLast;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableLast)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableLast)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableLast)(f(Data_Unit.unit));
});
var foldableWithIndexFirst = new FoldableWithIndex(function () {
    return Data_Foldable.foldableFirst;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableFirst)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableFirst)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableFirst)(f(Data_Unit.unit));
});
var foldableWithIndexDual = new FoldableWithIndex(function () {
    return Data_Foldable.foldableDual;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableDual)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableDual)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableDual)(f(Data_Unit.unit));
});
var foldableWithIndexDisj = new FoldableWithIndex(function () {
    return Data_Foldable.foldableDisj;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableDisj)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableDisj)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableDisj)(f(Data_Unit.unit));
});
var foldableWithIndexConj = new FoldableWithIndex(function () {
    return Data_Foldable.foldableConj;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableConj)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableConj)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableConj)(f(Data_Unit.unit));
});
var foldableWithIndexAdditive = new FoldableWithIndex(function () {
    return Data_Foldable.foldableAdditive;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableAdditive)(dictMonoid)(f(Data_Unit.unit));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableAdditive)(f(Data_Unit.unit));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableAdditive)(f(Data_Unit.unit));
});
var foldWithIndexM = function (dictFoldableWithIndex) {
    return function (dictMonad) {
        return function (f) {
            return function (a0) {
                return foldlWithIndex(dictFoldableWithIndex)(function (i) {
                    return function (ma) {
                        return function (b) {
                            return Control_Bind.bind(dictMonad.Bind1())(ma)(Data_Function.flip(f(i))(b));
                        };
                    };
                })(Control_Applicative.pure(dictMonad.Applicative0())(a0));
            };
        };
    };
};
var foldMapWithIndexDefaultR = function (dictFoldableWithIndex) {
    return function (dictMonoid) {
        return function (f) {
            return foldrWithIndex(dictFoldableWithIndex)(function (i) {
                return function (x) {
                    return function (acc) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(f(i)(x))(acc);
                    };
                };
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
var foldableWithIndexArray = new FoldableWithIndex(function () {
    return Data_Foldable.foldableArray;
}, function (dictMonoid) {
    return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
}, function (f) {
    return function (z) {
        return function ($42) {
            return Data_Foldable.foldl(Data_Foldable.foldableArray)(function (y) {
                return function (v) {
                    return f(v.value0)(y)(v.value1);
                };
            })(z)(Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create)($42));
        };
    };
}, function (f) {
    return function (z) {
        return function ($43) {
            return Data_Foldable.foldr(Data_Foldable.foldableArray)(function (v) {
                return function (y) {
                    return f(v.value0)(v.value1)(y);
                };
            })(z)(Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create)($43));
        };
    };
});
var foldMapWithIndexDefaultL = function (dictFoldableWithIndex) {
    return function (dictMonoid) {
        return function (f) {
            return foldlWithIndex(dictFoldableWithIndex)(function (i) {
                return function (acc) {
                    return function (x) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(i)(x));
                    };
                };
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
var foldMapWithIndex = function (dict) {
    return dict.foldMapWithIndex;
};
var foldlWithIndexDefault = function (dictFoldableWithIndex) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function (i) {
                    return function ($44) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(c(i))($44)));
                    };
                })(xs)))(u);
            };
        };
    };
};
var foldrWithIndexDefault = function (dictFoldableWithIndex) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo)(function (i) {
                    return function ($45) {
                        return Data_Monoid_Endo.Endo(c(i)($45));
                    };
                })(xs))(u);
            };
        };
    };
};
var surroundMapWithIndex = function (dictFoldableWithIndex) {
    return function (dictSemigroup) {
        return function (d) {
            return function (t) {
                return function (f) {
                    var joined = function (i) {
                        return function (a) {
                            return function (m) {
                                return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(i)(a))(m));
                            };
                        };
                    };
                    return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo)(joined)(f))(d);
                };
            };
        };
    };
};
var findWithIndex = function (dictFoldableWithIndex) {
    return function (p) {
        var go = function (i) {
            return function (v) {
                return function (v1) {
                    if (v instanceof Data_Maybe.Nothing && p(i)(v1)) {
                        return new Data_Maybe.Just(v1);
                    };
                    return v;
                };
            };
        };
        return foldlWithIndex(dictFoldableWithIndex)(go)(Data_Maybe.Nothing.value);
    };
};
var anyWithIndex = function (dictFoldableWithIndex) {
    return function (dictHeytingAlgebra) {
        return function (t) {
            return function ($46) {
                return Data_Newtype.unwrap(Data_Monoid_Disj.newtypeDisj)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra))(function (i) {
                    return function ($47) {
                        return Data_Monoid_Disj.Disj(t(i)($47));
                    };
                })($46));
            };
        };
    };
};
var allWithIndex = function (dictFoldableWithIndex) {
    return function (dictHeytingAlgebra) {
        return function (t) {
            return function ($48) {
                return Data_Newtype.unwrap(Data_Monoid_Conj.newtypeConj)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra))(function (i) {
                    return function ($49) {
                        return Data_Monoid_Conj.Conj(t(i)($49));
                    };
                })($48));
            };
        };
    };
};
module.exports = {
    FoldableWithIndex: FoldableWithIndex,
    foldrWithIndex: foldrWithIndex,
    foldlWithIndex: foldlWithIndex,
    foldMapWithIndex: foldMapWithIndex,
    foldrWithIndexDefault: foldrWithIndexDefault,
    foldlWithIndexDefault: foldlWithIndexDefault,
    foldMapWithIndexDefaultR: foldMapWithIndexDefaultR,
    foldMapWithIndexDefaultL: foldMapWithIndexDefaultL,
    foldWithIndexM: foldWithIndexM,
    traverseWithIndex_: traverseWithIndex_,
    forWithIndex_: forWithIndex_,
    surroundMapWithIndex: surroundMapWithIndex,
    allWithIndex: allWithIndex,
    anyWithIndex: anyWithIndex,
    findWithIndex: findWithIndex,
    foldableWithIndexArray: foldableWithIndexArray,
    foldableWithIndexMaybe: foldableWithIndexMaybe,
    foldableWithIndexFirst: foldableWithIndexFirst,
    foldableWithIndexLast: foldableWithIndexLast,
    foldableWithIndexAdditive: foldableWithIndexAdditive,
    foldableWithIndexDual: foldableWithIndexDual,
    foldableWithIndexDisj: foldableWithIndexDisj,
    foldableWithIndexConj: foldableWithIndexConj,
    foldableWithIndexMultiplicative: foldableWithIndexMultiplicative
};
