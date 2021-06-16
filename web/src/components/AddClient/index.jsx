import { React, useEffect, useState } from 'react';
import { formatName, maskCpf, maskTel } from '../../Tools';
import './style.css';
// import SnackBar from '../SnackBar';

export default (props) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enable, setEnable] = useState(true);

  /**
   * states snackbar
   */
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (
      email.length > 0 &&
      name.length > 0 &&
      cpf.length > 0 &&
      phone.length > 0
    ) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [name, email, cpf, phone]);

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
    <form
      className={
        props.open
          ? 'new-client-container client-container-open-menu'
          : 'new-client-container client-container-closed-menu'
      }>
      <h2>Adicionar um novo cliente!</h2>
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
        type='text'
        placeholder='Telefone'
        value={phone}
        onChange={(e) => setPhone(maskTel(e.target.value))}
      />
      <button type='submit' onClick={() => setOpen((prevState) => !prevState)}>
        Criar conta
      </button>
      {/* <SnackBar
        severity={severity}
        message={message}
        time={6000}
        action={(value) => setOpen(value)}
      /> */}
    </form>
  );
};
