import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Headerr from './component/common/Headerr';
import Index from './component/common/Index';
// import FollowList from './component/follow/followList';
// import Test from './component/follow/Test';
import Footer from './component/common/Footer';
import ProductList from './component/product/ProductList';
import FollowListt from './component/follow/FollowListt';

function App() {
  return (
    <BrowserRouter>
      <Headerr />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/product/list' element={<ProductList />} />
        {/* <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} /> */}
        {/* <Route path='FollowListt' element={<FollowListt />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
