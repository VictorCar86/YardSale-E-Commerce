import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './context/reduxState';
import { Provider } from 'react-redux';
import Login from './routes/Login';
import Signup from './routes/Signup';
import MainPage from './routes/MainPage';
import Error404 from './routes/Error404';
import AccountMenu from './containers/AccountMenu';
import ShoppingCartModal from './containers/ShoppingCartModal';
import SuccessRecover from './routes/SuccessRecover';
import "./App.css";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/recovery' element={<SuccessRecover />} />
          <Route path='/account-menu' element={<AccountMenu />} />
          <Route path='/shopping-cart' element={<ShoppingCartModal />} />
          <Route path='*' element={<Error404 />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;