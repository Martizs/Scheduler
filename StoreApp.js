import React from 'react';
import { initStore } from './redux/store';
import { Provider } from 'react-redux';
import AppAlarm from './AppAlarm';

export const store = initStore();

export class StoreApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppAlarm {...this.props} />
      </Provider>
    );
  }
}
