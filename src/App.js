import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './component/common/Index';
import ProductList from './component/product/ProductList';
import Signin from './component/member/Signin';
import SignLayout from './component/layout/SignLayout';
import MainLayout from './component/layout/MainLayout';
import ProductDetail from './component/product/ProductDetail';
import Signup from './component/member/Signup';
import MyCart from './component/order/MyCart';
import MyOrder from './component/order/MyOrder';
import SignEmail from './component/member/SignEmail';
import AdminLayout from './component/layout/AdminLayout';
import AIndex from './component/admin/AIndex';
import OrderSuccessed from './component/order/OrderSuccess';
import OrderFailed from './component/order/OrderFailed';
import SendLetterPage from './component/letter/SendLetterPage';
import SendLetterPage33 from './resources/followhtml/SendLetterTest2';
import FollowList from './component/follow/layout/FollowList';
import { AuthProvider } from "./hooks/AuthContext";
import VerifyEmail from './component/member/VerifyEmail';
import SignupForm from './component/member/SignupForm';
import OAuth2RedirectHandler from './component/member/OAuth2RedirectHandler';
import ProfileCard from './component/common/ProfileCard';
import ChatRoomList from './component/chat/ChatList';
import ChatTestList from './component/chat/layout/ChatTestList';
import FollowersList from './component/follow/layout/FollowersList';
import MyPageLayout from './component/member/MyPageLayout';
import FollowingList from './component/follow/layout/FollowingList';
import FollwSenderPage from './component/follow/layout/FollowSenderPage';
import FollowApp from './component/follow/test/FollowApp';
import LetterReceivedListTest from './component/letter/test/LetterListComponent';
import LetterHeader from './component/letter/layout/LetterHeader';
import ProfilePageLayout from './component/member/ProfilePageLayout';
import LetterSenderListTest from './component/letter/test/LetterSenderListTest';
import LetterViewComponent from './component/letter/layout/LetterViewComponent';
import LetterListLayOutTest from './component/letter/SendLetterPage';
import LetterListComponent from './component/letter/test/LetterListComponent';
import LetterSelectViewPage from './component/letter/layout/LetterSelectViewPage';
import Notice from './component/common/Notice';
import AboutUs from './component/common/pilllaw/AboutUs';
import UserReviews from './component/member/profilePageChildren/UserReviews';


function App() {
  return (
    <BrowserRouter basename='/pilllaw'>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path='/product/list' element={<ProductList />} />
            <Route path='/product/detail/:id' element={<ProductDetail />} />
            {/* <Route path='/user-reviews/:id' element={<UserReviews />} /> */}
            {/* <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} /> */}
            {/* <Route path='FollowListt' element={<FollowListt />} /> */}

            <Route path='/notice' element={<Notice/> }/>
            <Route path='/profilecard' element={<ProfileCard/> }/>
            <Route path='/followlist' element={<FollowList/> }/>
            <Route path='/followerslist' element={<FollowersList/> }/>
            <Route path='/followinglist' element={<FollowingList/> }/>
            <Route path='/followapp' element={<FollowApp/> }/>
            <Route path='/chatroomList' element={<ChatRoomList/> }/>
            <Route path='/followsenderpage' element={<FollwSenderPage/>}/>
            {/* <Route path='/followisback' element={<FollowIsBack/>}/> */}
            <Route path='/chattestlist' element={<ChatTestList/> }/>
            {/* <Route path='/userprofile' element={<UserProfile />}/> */}

            <Route path='/letterlistlayouttest' element={<LetterListLayOutTest />}/>
            <Route path='/letterlisttest' element={<LetterSenderListTest />}/>
            <Route path='/letterreceivedlisttest' element={<LetterReceivedListTest />}/>
            <Route path='/letterheader' element={<LetterHeader />}/>
            <Route path='/letterlistcomponent' element={<LetterListComponent />}/>
            <Route path='/letterviewcomponent' element={<LetterViewComponent />}/>

            {/* <Route path='/senderletterpage' element={<SendLetterPage />}/> */}
            <Route path='/sendletter33' element={<SendLetterPage33 />}/>
            <Route path='/cart' element={<MyCart />} />
            <Route path='/order' element={<MyOrder />} />
            <Route path='/order/success' element={<OrderSuccessed />} />
            <Route path='/order/fail' element={<OrderFailed />} />
            <Route path='/mypage' element={<MyPageLayout />} />
            <Route path='/userpage/:id' element={<ProfilePageLayout />} />
            <Route path='/letterselectview/:id' element={<LetterSelectViewPage />} />
          
            <Route path='/aboutus' element={<AboutUs />} />
          </Route>

          <Route element={<SignLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/form" element={<SignupForm />} />
            <Route path="/verify/email" element={<SignEmail />} />
            <Route path='/mypage/email/verify' element={<VerifyEmail />} />
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