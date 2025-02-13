import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './component/common/Index';
// import FollowList from './component/follow/followList';
// import Test from './component/follow/Test';
import ProductList from './component/product/ProductList';
import FollowListt from './component/follow/FollowListt';
import Signin from './component/member/Signin';
import SignLayout from './component/layout/SignLayout';
import MainLayout from './component/layout/MainLayout';
import ProductDetail from './component/product/ProductDetail';
import Signup from './component/member/Signup';
// import ProfilePage from './component/follow/LetterReplyTest';
import SendLetter from './component/letter/SendLetterTest';
import MyCart from './component/order/MyCart';
import MyOrder from './component/order/MyOrder';
import SignTerms from './component/member/SignTerms';
import SignEmail from './component/member/SignEmail';
import AdminLayout from './component/layout/AdminLayout';
import AIndex from './component/admin/AIndex';
import UserProfile from './component/follow/FollowProfile';
import OrderSuccessed from './component/order/OrderSuccess';
import SignupForm from './component/member/SignupForm';
import OrderFailed from './component/order/OrderFailed';
import UserProfile22 from './component/letter/SendLetter copy';
import SendLetterPage from './component/letter/SendLetter copy';


function App() {
  return (
    <BrowserRouter basename='/pilllaw'>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path='/product/list' element={<ProductList />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          {/* <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} /> */}
          {/* <Route path='FollowListt' element={<FollowListt />} /> */}
          <Route path='/followlistt' element={<FollowListt />} />
          {/* <Route path='/letterreplytest' element={<LetterReplyTest />} /> */}
          <Route path='/sendletter' element={<SendLetter />}/>
          <Route path='/userprofile' element={<UserProfile />}/>
          <Route path='/sendletterpage' element={<SendLetterPage />}/>
          <Route path='/cart' element={<MyCart />} />
          <Route path='/order' element={<MyOrder />} />
          <Route path='/order/success' element={<OrderSuccessed />} />
          <Route path='/order/fail' element={<OrderFailed />} />
        </Route>

        <Route element={<SignLayout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/terms" element={<SignTerms />} />
          <Route path="/signup/email" element={<SignEmail />} />
          <Route path="/signup/form" element={<SignupForm />} />
        </Route>
{/* 
        <Route element={<AdminLayout />}>
          <Route path='/admin/' element={<AIndex />} />
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;