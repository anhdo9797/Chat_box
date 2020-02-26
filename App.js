import React from 'react';
import {Provider} from 'react-redux';

import Mystack from './src/navigation/navigator';
import mainStore from './src/redux/store';

const store = mainStore();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Mystack />
    </Provider>
  );
};

export default App;
