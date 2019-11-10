import { useReducer, useEffect, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as queryString from 'query-string';

type Action = 'push' | 'replace';

type Value = string | boolean | number | string[];

type Options = {
  action?: Action,
  delay?: number
};

type TypeEmptyValueMap = {
  [key: string]: any
};

const isUndefinedOrNull = (v: any) => v === undefined || v === null;

const isSame = (var1: any, var2: any) => (
  var1 === var2
  || (
    !isUndefinedOrNull(var1) && !isUndefinedOrNull(var2) && var1.toString() === var2.toString()
  )
);

const TYPE_EMPTY_VALUE_MAP: TypeEmptyValueMap = {
  'string': '',
  'number': 0,
  'boolean': false,
  'array': []
};

const isValidType = (value: any, allowNullAndUndefined = false) => {
  if (
    !(
      Array.isArray(value)
      || Object.keys(TYPE_EMPTY_VALUE_MAP).indexOf(typeof value) > -1
      || (allowNullAndUndefined && (value === null || value === undefined))
    )
  ) {
    console.log('isValidType', value);
    throw new Error('useQueryState: the type is not supported.');
  }
}

const LOCATION_CHANGE = 'LOCATION_CHANGE';
const STATE_CHANGE = 'STATE_CHANGE';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { currentQueryValue, key } = action.payload;
      if (!isSame(currentQueryValue, state[key])) {
        let normalizedValue = currentQueryValue;
        if (currentQueryValue === '') {
          // i.e. ?a=
          // fill in empty value based on type
          normalizedValue = TYPE_EMPTY_VALUE_MAP[state.type];
        } else if (state.type === 'array' && !Array.isArray(currentQueryValue)) {
          // i.e. ?a=1
          // for single elemnt
          // tranform to array type
          normalizedValue = [currentQueryValue];
        }
        return {
          ...state,
          [key]: normalizedValue
        }
      }
      return state;
    }
    case STATE_CHANGE: {
      const { newValue, key } = action.payload;
      return {
        ...state,
        [key]: newValue
      }
    }
  }
}

const useQueryState = (defaultValue: Value, varName: string, { action = 'push', delay = 0 }: Options = {}) => {
  const location = useLocation();
  const history = useHistory();

  // get value type from defaultValue
  isValidType(defaultValue);
  const type = Array.isArray(defaultValue) ? 'array' : typeof defaultValue;

  const [state, dispatch] = useReducer(reducer, { [varName]: defaultValue, type });
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const isPending = useRef(false);
  const isChanged = useRef(false);

  // clear setTimeout
  const clearTimer = useCallback(() => {
    isPending.current = false;
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  // push or replace history
  const manipulateHistory = useCallback((func: any, delay: number) => {
    // debounce
    isPending.current = true;
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      isPending.current = false;
      func();
    }, delay);
  }, []);

  useEffect(() => {
    // changing location
    // sync state
    if (!isPending.current) {
      const { search } = location;
      const parsedQuery = queryString.parse(search, { arrayFormat: 'comma' });
      const queryValue: any = parsedQuery[varName];
      // if query value is not supplied or state value is never changed
      // preserve default value
      if (
        queryValue !== undefined
        || isChanged.current
      ) {
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

  const setVar = useCallback((newValue: Value | null | undefined) => {
    isValidType(newValue, true);
    // changing state
    // sync location
    // access location from history to ensure it is the most updated one
    const { search, pathname } = history.location;
    const parsedQuery = queryString.parse(search, { arrayFormat: 'comma' });
    const queryVar = parsedQuery[varName];
    if (!isSame(queryVar, newValue)) {
      const newSearch = `?${queryString.stringify(
        {
          ...parsedQuery,
          [varName]: newValue
        }, {
          arrayFormat: 'comma'
        }
      )}`;
      
      // mutate history object synchronously
      history.location.search = newSearch;

      // push or replace history state asynchronously
      manipulateHistory(
        history[action].bind(
          null,
          `${pathname}${newSearch}` as any
        ),
        delay
      );
    }
    // sync state
    dispatch({
      type: STATE_CHANGE,
      payload: {
        key: varName,
        newValue
      }
    });
  }, [varName, action, delay, history, manipulateHistory]);

  return [state![varName], setVar];
};

export default useQueryState;
