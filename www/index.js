import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import chat from './app'


ReactDOM.render(
  <Provider>
    <Chat />
  </Provider>,
  document.getElementById('container')
);


//* const counter = (state = 0, action) => {
//   switch (action.type) {
//   case 'INCREMENT':
//     return state + 1
//   case 'DECREMENT':
//     return state - 1
//   default:
//     return state
//   }
// }

// const Counter = ({ value }) =>(
// 		<h1> {value} </h1>
// );

// const { createStore } = Redux;

// const store = createStore(counter);

// const render = () => {
// 	ReactDom.render(
// 			<Counter value = {state.getState()} />,
// 			document.getElementById('container')
// 		);
// };*/*/