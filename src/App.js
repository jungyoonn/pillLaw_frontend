import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Headerr from './component/common/Headerr';
import Index from './component/common/Index';

function App() {
  return (
    <BrowserRouter>
      <Headerr />
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
