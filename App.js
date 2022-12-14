import Route from './src/navigation/Route';
import { Provider } from 'react-redux';
import store from './src/redux/stores';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable']);
const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
