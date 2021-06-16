import { useState } from 'react';
import market from '../../assets/mercado.jpg';
import Login from '../../components/login/Login';
import NewUser from '../../components/login/NewUser';
import './style.css';

export default function PageLogin() {
  const [openLogin, setOpenLogin] = useState(true);

  return (
    <div className='login'>
      <img
        className='login-img-background'
        src={market}
        alt='imagem supermercado'
      />
      <section className='login-section'>
        <header>
          <button
            className={openLogin ? 'active' : ''}
            type='submit'
            onClick={() => setOpenLogin(true)}>
            Login
          </button>
          <button
            className={!openLogin ? 'active' : ''}
            type='submit'
            onClick={() => setOpenLogin(false)}>
            Novo Usuário
          </button>
        </header>
        <main className='login-section-main'>
          {openLogin ? <Login /> : <NewUser login={(v)=> setOpenLogin(v)}/>}
        </main>
      </section>
    </div>
  );
}
