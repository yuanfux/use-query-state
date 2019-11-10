"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var queryString = require("query-string");
var isUndefinedOrNull = function (v) { return v === undefined || v === null; };
var isSame = function (var1, var2) { return (var1 === var2
    || (!isUndefinedOrNull(var1) && !isUndefinedOrNull(var2) && var1.toString() === var2.toString())); };
var TYPE_EMPTY_VALUE_MAP = {
    'string': '',
    'number': 0,
    'boolean': false,
    'array': []
};
var isValidType = function (value, allowNullAndUndefined) {
    if (allowNullAndUndefined === void 0) { allowNullAndUndefined = false; }
    if (!(Array.isArray(value)
        || Object.keys(TYPE_EMPTY_VALUE_MAP).indexOf(typeof value) > -1
        || (allowNullAndUndefined && (value === null || value === undefined)))) {
        console.log('isValidType', value);
        throw new Error('useQueryState: the type is not supported.');
    }
};
var LOCATION_CHANGE = 'LOCATION_CHANGE';
var STATE_CHANGE = 'STATE_CHANGE';
var reducer = function (state, action) {
    var _a, _b;
    switch (action.type) {
        case LOCATION_CHANGE: {
            var _c = action.payload, currentQueryValue = _c.currentQueryValue, key = _c.key;
            if (!isSame(currentQueryValue, state[key])) {
                var normalizedValue = currentQueryValue;
                if (currentQueryValue === '') {
                    // i.e. ?a=
                    // fill in empty value based on type
                    normalizedValue = TYPE_EMPTY_VALUE_MAP[state.type];
                }
                else if (state.type === 'array' && !Array.isArray(currentQueryValue)) {
                    // i.e. ?a=1
                    // for single elemnt
                    // tranform to array type
                    normalizedValue = [currentQueryValue];
                }
                return __assign(__assign({}, state), (_a = {}, _a[key] = normalizedValue, _a));
            }
            return state;
        }
        case STATE_CHANGE: {
            var _d = action.payload, newValue = _d.newValue, key = _d.key;
            return __assign(__assign({}, state), (_b = {}, _b[key] = newValue, _b));
        }
    }
};
var useQueryState = function (defaultValue, varName, _a) {
    var _b;
    var _c = _a === void 0 ? {} : _a, _d = _c.action, action = _d === void 0 ? 'push' : _d, _e = _c.delay, delay = _e === void 0 ? 0 : _e;
    var location = react_router_dom_1.useLocation();
    var history = react_router_dom_1.useHistory();
    // get value type from defaultValue
    isValidType(defaultValue);
    var type = Array.isArray(defaultValue) ? 'array' : typeof defaultValue;
    var _f = react_1.useReducer(reducer, (_b = {}, _b[varName] = defaultValue, _b.type = type, _b)), state = _f[0], dispatch = _f[1];
    var timer = react_1.useRef();
    var isPending = react_1.useRef(false);
    var isChanged = react_1.useRef(false);
    // clear setTimeout
    var clearTimer = react_1.useCallback(function () {
        isPending.current = false;
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);
    // push or replace history
    var manipulateHistory = react_1.useCallback(function (func, delay) {
        // debounce
        isPending.current = true;
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(function () {
            isPending.current = false;
            func();
        }, delay);
    }, []);
    react_1.useEffect(function () {
        // changing location
        // sync state
        if (!isPending.current) {
            var search = location.search;
            var parsedQuery = queryString.parse(search, { arrayFormat: 'comma' });
            var queryValue = parsedQuery[varName];
            // if query value is not supplied or state value is never changed
            // preserve default value
            if (queryValue !== undefined
                || isChanged.current) {
                isChanged.current = true;
                dispatch({
                    type: LOCATION_CHANGE,
                    payload: {
                        key: varName,
                        currentQueryValue: queryValue
                    }
                });
            }
        }
        return clearTimer;
    }, [varName, location, clearTimer]);
    var setVar = react_1.useCallback(function (newValue) {
        var _a;
        isValidType(newValue, true);
        // changing state
        // sync location
        // access location from history to ensure it is the most updated one
        var _b = history.location, search = _b.search, pathname = _b.pathname;
        var parsedQuery = queryString.parse(search, { arrayFormat: 'comma' });
        var queryVar = parsedQuery[varName];
        if (!isSame(queryVar, newValue)) {
            var newSearch = "?" + queryString.stringify(__assign(__assign({}, parsedQuery), (_a = {}, _a[varName] = newValue, _a)), {
                arrayFormat: 'comma'
            });
            // mutate history object synchronously
            history.location.search = newSearch;
            // push or replace history state asynchronously
            manipulateHistory(history[action].bind(null, "" + pathname + newSearch), delay);
        }
        // sync state
        dispatch({
            type: STATE_CHANGE,
            payload: {
                key: varName,
                newValue: newValue
            }
        });
    }, [varName, action, delay, history, manipulateHistory]);
    return [state[varName], setVar];
};
exports.default = useQueryState;
