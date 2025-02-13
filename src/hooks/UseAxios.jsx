import { useCallback, useState } from 'react';
import axios from 'axios';
// import { useAuth } from './AuthContext';

const BASE_URL = 'http://localhost:8080/api/v1/';

const UseAxios = (baseUrl = BASE_URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {token} = useAuth();

  const req = useCallback(
    async (method, endpoint, body = null, addHeaders = {}) => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios({
          url: `${baseUrl}${endpoint}`,
          method,
          data: body,
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
            ...addHeaders
          }
        });
        setData(resp.data);
        return resp.data; // 이펙트를 쓰지 않아서 리턴 추가
      } catch(err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  , [baseUrl, token]);

  return {data, loading, error, req};
}

export default UseAxios;
