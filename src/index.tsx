import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './store/index';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReducerKeys } from './store/config';

const store = createStore(rootReducer, {}, composeWithDevTools());

export const getState = (reducerKey: ReducerKeys): any => {
    if (reducerKey in store.getState())
        return (store.getState() as any)[reducerKey];
    return store.getState();
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

(module as any).hot.accept();
