import { useEffect, useState } from 'react';
import { formatName, maskCpf, maskTel } from '../../Tools/index';
import api from '../../services/api';
import './style.css';

export default function NewUser(props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    if (email.length > telephone.length > 0 && name.length > 0) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [name, email, telephone]);

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
    const str = telephone.replace(/\D/g, '');
    if (str.length === 11) {
      setTelephone(maskTel(str));
    } else if (str.length > 11) {
      alert('O telefone só pode ter 11 digitos');
      setTelephone(str.substring(0, 11));
    }
  }, [telephone]);

  useEffect(() => {
    const aux = name.split(' ');
    setLastname(
      aux.filter((value, index) => index > 0 && value.length > 0).join(' '),
    );
  }, [name]);
// ADD CLIENT
  const handleAddCostumer = async (e) => {
    try {
      e.preventDefault();
      const { data, status } = await api.post('/customers/create', {
        name,
        lastname,
        telephone,
        cpf,
        email,
        is_deleted: true,
        created_at: new Date(),
      });

      if (status === 200) {
        alert(`Cliente ID: ${data.id} criado com sucesso!`);
      }
    } catch (error) {
      console.log(error);
      alert('error: ' + error.response.data.message || error.message);
    }
  };
  return (
    <form
      className={
        props.open
          ? 'new-client-container sale-container-open-menu'
          : 'new-client-container sale-container-closed-menu'
      }>
      <h1>Cadastro de cliente</h1>
      <input
        type='text'
        placeholder='Nome'
        value={name}
        onChange={(e) => setName(formatName(e.target.value))}
      />
      <input
        type='text'
        placeholder='Sobrenome'
        value={lastname}
        onChange={(e) => setLastname(formatName(e.target.value))}
      />
      <input
        type='text'
        placeholder='CPF'
        value={cpf}
        onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
      />
      <input
        type='text'
        placeholder='Telefone'
        value={telephone}
        onChange={(e) => setTelephone(e.target.value.replace(/\D/g, ''))}
      />
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      <button
        type='submit'
        disabled={enable}
        onClick={(e) => handleAddCostumer(e)}>
        Cadastrar cliente
      </button>
    </form>
  );
}
