import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './component/common/Index';
// import FollowList from './component/follow/followList';
// import Test from './component/follow/Test';
import ProductList from './component/product/ProductList';
import Signin from './component/member/Signin';
import SignLayout from './component/layout/SignLayout';
import MainLayout from './component/layout/MainLayout';
import ProductDetail from './component/product/ProductDetail';
import Signup from './component/member/Signup';
// import SendLetter from './component/letter/SendLetterTest';
import MyCart from './component/order/MyCart';
import MyOrder from './component/order/MyOrder';
import SignEmail from './component/member/SignEmail';
import AdminLayout from './component/layout/AdminLayout';
import AIndex from './component/admin/AIndex';
import UserProfile from './component/follow/FollowProfile';
import OrderSuccessed from './component/order/OrderSuccess';
import OrderFailed from './component/order/OrderFailed';
// import UserProfile22 from './component/letter/SendLetterPage';
import SendLetterPage from './component/letter/SendLetterPage';
import SendLetterPage33 from './resources/followhtml/SendLetterTest2';
import FollowList from './component/follow/FollowList';
import LetterReplyTest from './component/letter/LetterReplyTest';
import { AuthProvider } from "./hooks/AuthContext";
import VerifyEmail from './component/member/VerifyEmail';
import SignupForm from './component/member/SignupForm';
import OAuth2RedirectHandler from './component/member/OAuth2RedirectHandler';


function App() {
  return (
    <BrowserRouter basename='/pilllaw'>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path='/product/list' element={<ProductList />} />
            <Route path='/product/detail/:id' element={<ProductDetail />} />
            {/* <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} /> */}
            {/* <Route path='FollowListt' element={<FollowListt />} /> */}
            <Route path='/followlist' element={<FollowList/> }/>
            <Route path='/userprofile' element={<UserProfile />}/>
            <Route path='/letterreplytest' element={<LetterReplyTest />} />
            <Route path='/sendletterpage' element={<SendLetterPage />}/>
            <Route path='/sendletter33' element={<SendLetterPage33 />}/>
            <Route path='/cart' element={<MyCart />} />
            <Route path='/order' element={<MyOrder />} />
            <Route path='/order/success' element={<OrderSuccessed />} />
            <Route path='/order/fail' element={<OrderFailed />} />
          </Route>

          <Route element={<SignLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/form" element={<SignupForm />} />
            <Route path="/verify/email" element={<SignEmail />} />
            <Route path='/verify/email/verify' element={<VerifyEmail />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          </Route>
  {/* 
          <Route element={<AdminLayout />}>
            <Route path='/admin/' element={<AIndex />} />
          </Route> */}

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;