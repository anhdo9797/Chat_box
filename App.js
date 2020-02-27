import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Mystack from './src/navigation/navigator';
import mainStore from './src/redux/store';

const store = mainStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Mystack />
      </Provider>
    );
  }
}

// const App: () => React$Node = () => {
//   return (
//     <Provider store={store}>
//       <Mystack />
//     </Provider>
//   );
// };

// export default App;
