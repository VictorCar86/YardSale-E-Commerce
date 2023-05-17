import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './context/reduxState';
import { Provider } from 'react-redux';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Recovery from './routes/Recovery';
import MainPage from './routes/MainPage';
import MyAccount from './routes/MyAccount';
import Error404 from './routes/Error404';
// import SuccessRecover from './routes/SuccessRecover';
// import ShoppingCartModal from './containers/ShoppingCartModal';
// import AccountMenu from './containers/AccountMenu';
import UserInfoReq from './hooks/UserInfoReq';
import axios from 'axios';
axios.defaults.withCredentials = true;
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <UserInfoReq/>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/my-account' element={<MyAccount />} />
          {/* <Route path='/shopping-cart' element={<ShoppingCartModal />} /> */}
          <Route path='*' element={<Error404 />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;