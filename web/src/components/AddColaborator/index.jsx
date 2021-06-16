import { useEffect, useState } from 'react';
import { formatName, maskCpf } from '../../Tools';
import './style.css';

export default (props) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    if (
      email.length > 0 &&
      name.length > 0 &&
      cpf.length > 0 &&
      password.length > 0
    ) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [name, email, cpf, password]);

  useEffect(() => {
    const aux = cpf.replace(/\D/g, '');
    if (aux.length === 11) {
      setCpf(maskCpf(aux));
    } else if (aux.length > 11) {
      alert('O cpf só pode ter 11 digitos');
      setCpf(aux.substring(0, 11));
    }
  }, [cpf]);

  return (
    <form className='new-colaborator-container'>
      <h2>Adicionar um novo colaborador!</h2>
      <input
        type='text'
        placeholder='Nome Completo'
        value={name}
        onChange={(e) => setName(formatName(e.target.value))}
      />
      <input
        type='text'
        placeholder='CPF'
        value={cpf}
        onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
      />
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      <input
        type='password'
        placeholder='Senha'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' disabled={enable}>
        Criar conta
      </button>
    </form>
  );
};
