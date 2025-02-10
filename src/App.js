import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Headerr from './component/common/Headerr';
import Index from './component/common/Index';
// import FollowList from './component/follow/followList';
// import Test from './component/follow/Test';
import Footer from './component/common/Footer';
import ProductList from './component/product/ProductList';
import FollowListt from './component/follow/FollowListt';
import Signin from './component/member/Signin';
import SignLayout from './component/layout/SignLayout';
import MainLayout from './component/layout/MainLayout';
import Cart from './component/order/cart';
import Order from './component/order/order';
import OrderSuccess from './component/order/orderSuccess';
import OrderFail from './component/order/orderFail';
import ProductDetail from './component/product/ProductDetail';
import Signup from './component/member/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path='/product/list' element={<ProductList />} />
          <Route path='/product/list' element={<ProductDetail />} />
          {/* <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} /> */}
          {/* <Route path='FollowListt' element={<FollowListt />} /> */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/order/success' element={<OrderSuccess />} />
          <Route path='/order/fail' element={<OrderFail />} />
        </Route>

        <Route element={<SignLayout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
