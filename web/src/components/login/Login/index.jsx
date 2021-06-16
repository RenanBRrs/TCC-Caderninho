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

  return (
    <>
      {remember ? (
        <Remember handleBack={(v) => setRemember(v)} />
      ) : (
        <form className='login-container'>
          <div className='login-content-inputs'>
            <h1>Caderinho</h1>
            <input
              type='text'
              placeholder='Email'
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <input
              type='password'
              placeholder='Senha'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <section>
              <button
                type='submit'
                disabled={enable}
                onClick={(e) => handleLogin(e)}>
                Login
              </button>
              <button
                className='login-remember'
                onClick={() => setRemember(true)}>
                esqueceu a senha?
              </button>
              {/* <a href='#'>esqueceu a senha?</a> */}
            </section>
          </div>

          <footer>
            <p>Sistema Colapso - </p>
            <strong>{new Date().getFullYear()}</strong>
          </footer>
        </form>
      )}
    </>
  );
}
