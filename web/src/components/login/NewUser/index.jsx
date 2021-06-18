import { useEffect, useState } from 'react';
import { formatName, maskCpf } from '../../../Tools';
import api from '../../../services/api';
import './style.css';

export default function NewUser(props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    if (email.length > 0 && password.length > 0 && name.length > 0) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [name, email, password]);

  useEffect(() => {
    const aux = cpf.replace(/\D/g, '');
    if (aux.length === 11) {
      setCpf(maskCpf(aux));
    } else if (aux.length > 11) {
      alert('O cpf só pode ter 11 digitos');
      setCpf(aux.substring(0, 11));
    }
  }, [cpf]);

  useEffect(() => {
    const aux = name.split(' ');
    setLastname(
      aux.filter((value, index) => index > 0 && value.length > 0).join(' '),
    );
  }, [name]);

  const handleAddColaborator = async (e) => {
    try {
      e.preventDefault();
      const { data, status } = await api.post('/colaborators/create', {
        name: name.substring(0, name.indexOf(' ')),
        cpf,
        lastname,
        email,
        password,
        is_admin: false,
      });

      if (status === 200) {
        alert(`Usuário ID=${data.id} criado com sucesso!`);
        setTimeout(() => {
          props.login(true);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      alert('error: ' + error.response.data.message || error.message);
    }
  };

  return (
    <form className='new-user-container'>
      <h1>Bem-vindo</h1>
      <h3>Crie a sua conta</h3>

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
        autoComplete='new-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type='submit'
        disabled={enable}
        onClick={(e) => handleAddColaborator(e)}>
        Criar conta
      </button>
    </form>
  );
}
