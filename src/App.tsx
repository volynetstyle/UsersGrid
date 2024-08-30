import s from "./App.module.scss"
import { Provider } from 'react-redux';
import store from './store';
import UsersPage from "./pages/UsersPage";

function App() {

  return (
    <Provider store={store}>
      <div className={s.MainSection }>
        <UsersPage />
      </div>
    </Provider>
  )
}

export default App
