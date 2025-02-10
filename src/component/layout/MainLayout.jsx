import Headerr from '../common/Headerr';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <Headerr />
      <Outlet /> 
      <Footer />
    </>
  );
}

export default MainLayout;