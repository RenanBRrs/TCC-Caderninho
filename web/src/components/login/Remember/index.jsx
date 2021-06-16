import { useEffect, useState } from 'react';
import './style.css';

export default function Remember({ handleBack }) {
  const [email, setEmail] = useState('');
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    if (email.length > 0) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [email]);

  return (
    <div className='remember-content'>
      <input
        type='text'
        placeholder='Digite seu email'
        autoFocus={true}
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      <div className='remember-content-send'>
        <button disabled={enable}>Enviar</button>
        <button className='remember-back' onClick={() => handleBack(false)}>
          Voltar
        </button>
      </div>
    </div>
  );
}
