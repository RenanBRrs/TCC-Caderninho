// function add(a, b) {
//   return a + b;
// }
// function sub(a, b) {
//   return a - b;
// }
// function mult(a, b) {
//   return a * b;
// }
// function div(a, b) {
//   return a / b;
// }

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Remember from '../Remember';
import api from '../../../services/api';
import './style.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);
  const [remember, setRemember] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
      );
      const { data, status } = await api.post('login', {
        user: email,
        password,
      });

      if (status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.userDb));
        history.push('/home');
      }
    } catch (error) {
      alert('error' + error.response.data.message || error.message);
    }
  };
}
