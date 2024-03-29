import { configureStore } from '@reduxjs/toolkit';

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1
    };
  }

  return state;
};

/**
 * 기존 코드
 */
// const redux = require('redux');
// const store = redux.createStore(counterReducer);

const store = configureStore({
  reducer: counterReducer
});

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });