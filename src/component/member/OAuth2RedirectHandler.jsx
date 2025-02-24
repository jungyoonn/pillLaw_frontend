// components/member/OAuth2RedirectHandler.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const processLogin = async () => {
      try {
        // URL에서 토큰과 이메일 정보 가져오기
        // const resp = await req('get', );
        console.log('Current location:', location);
        console.log('Search params:', location.search);
        
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const email = params.get('email');
        const mno = params.get('mno');
        const error = params.get('error');

        console.log(token);
        console.log(email);
        console.log(mno);

        if (error) {
          throw new Error(decodeURIComponent(error));
        }

        if (!token || !email) {
          throw new Error('로그인 정보가 올바르지 않습니다.');
        }

        // 토큰 저장 및 로그인 처리
        await login(email, token, mno);
        navigate('/');

      } catch (error) {
        console.error('소셜 로그인 에러:', error);
        setError(error.message || '로그인 처리 중 오류가 발생했습니다.');
        // 에러 발생 시 로그인 페이지로 리디렉트 (3초 후)
        setTimeout(() => {
          navigate('/signin', { 
            state: { error: error.message || '소셜 로그인에 실패했습니다.' } 
          });
        }, 3000);
      }
    };

    processLogin();
  }, [location, login]);

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{error}</p>
        <p>잠시 후 로그인 페이지로 이동합니다...</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">로그인 처리중...</span>
      </div>
      <p className="mt-3">소셜 로그인 처리중입니다...</p>
    </div>
  );
};

export default OAuth2RedirectHandler;