import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import allReducers from './store/reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(allReducers, devTools)

test('renders learn react link', () => {
  const { getByText } = render(
    <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>);
  const button = getByText(/New Idiom/i);
  expect(button).toBeInTheDocument();
});
