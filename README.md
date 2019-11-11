# useQueryState
> :fishing_pole_and_fish: use Query String as State

# Preivew
View  [Demo](https://yuanfux.github.io/use-query-state/)

`useQueryState` is a React Hook that helps to bind Query String with React State and makes every user action memorizable.

## Prerequisite
- react ^16.8.0
- react-router-dom ^5.1.0

## Install
```
npm install use-query-state
```

## Usage
> just like using `setState`

#### Basic
```js
import useQueryState from 'use-query-state';

const App = () => {
  const [number, setNumber] = useQueryState(0, 'number');
  const random = () => {
    setNumber(Math.floor(Math.random() * 100));
  };
  return (
    <div>
      <div>{number}</div>
      <button onClick={random}>Random Number</button>
    </div>
  );
};
```
[![Edit Basic Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-router-5h8c6?fontsize=14)

#### Advanced
```js
import useQueryState from 'use-query-state';

const App = () => {
  const [input, setInput] = useQueryState('hello world', 'input', { action: 'replace', delay: 300 });
  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <div>
      <input value={input} onChange={onInputChange} />
    </div>
  );
}
```
[![Edit Advanced Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/basic-example-d8c2g?fontsize=14)


## API
### useQueryState(`DefaultValue`, `QueryParamName`, `Options?` ): [`Value`, `Setter`]

#### DefaultValue
- Type: `string`  |  `boolean`  |  `number`  |  `string[]`
- Required: `true`
- Description: the value is used when query parameter is `undefined`

#### QueryParamName
- Type: `string`
- Required: `true`
- Description: the value is used as the query parameter name

#### Options
- Type: 
  ```js
  {
    action?: 'push' | 'replace',
    delay?: number 
  }
  ```
- Required: `false`
- Description:
  - `action` is defining how to mutate the history state<br>
    `action` defaults to `'push'`
  - `delay` is defining the debounce wait time for mutating the history state when using `Setter`<br>
    `delay` defaults to `0`.

#### Value
- Type: `string`  |  `boolean`  |  `number`  |  `string[]` | `undefined` | `null`
- Description: the returned value for read

#### Setter
- Type: `(value: Value): void`
- Description: The setter used for setting the state


## License
MIT
