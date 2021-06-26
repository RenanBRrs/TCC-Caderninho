import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiSearch } from 'react-icons/fi';
import { maskCpf } from '../../Tools';

import './style.css';

export default (props) => {
  const [customers, setCustomers] = useState([]);
  const [cpf, setCpf] = useState('');
  const [sales, setSale] = useState([]);

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
    try {
      api.get('/customers/show').then(({ data }) => {
        console.log(sales);

        setSale(data);
      });
    } catch (error) {
      alert(error.response.data.message || error.message);
    }
  }, []);

  const handleSearch = async (e) => {
    console.log(customers);
    try {
      e.preventDefault();
      if (cpf.length === 0) {
        alert('Você precisa digitar um cpf.');
        return '';
      }
      const result = await api.get(`/customers/show/${cpf.replace(/\D/g, '')}`);
      console.log({ result: result.data });
      if (result.status === 200) {
        setCustomers(result.data);
      } else {
        setCustomers('');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div
      className={
        props.open
          ? 'sales-container sales-container-open-menu'
          : 'sales-container sales-container-closed-menu'
      }>
      <header className='customer-header'>
        <fieldset>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Digite o CPF do cliente para pesquisar'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <FiSearch onClick={(e) => handleSearch(e)} />
        </fieldset>

        {Object.keys(customers, sales).length > 0 && (
          <>
            <div>
              <fieldset>
                <label htmlFor='name-cliente'>NOME</label>
                <input
                  type='text'
                  name='name-cliente'
                  id='name-cliente'
                  value={customers.name + ' ' + customers.lastname}
                  readOnly
                />
              </fieldset>
              <fieldset>
                <label htmlFor='cpf-cliente'>CPF</label>
                <input
                  type='text'
                  name='name-cliente'
                  id='cpf-cliente'
                  value={customers.cpf}
                  readOnly
                />
              </fieldset>
            </div>
            <div>
              <fieldset>
                <label htmlFor='email-cliente'>EMAIL</label>
                <input
                  type='text'
                  name='email-cliente'
                  id='email-cliente'
                  value={customers.email}
                  readOnly
                />
              </fieldset>
              <fieldset>
                <label htmlFor='tel-cliente'>TEL</label>
                <input
                  type='text'
                  name='tel-cliente'
                  id='tel-cliente'
                  value={customers.telephone}
                  readOnly
                />
              </fieldset>
              <fieldset>
                <label htmlFor='tel-cliente'>Valor</label>
                <input
                  type='text'
                  name='tel-cliente'
                  id='tel-cliente'
                  value={customers.amount}
                  readOnly
                />
              </fieldset>
            </div>
          </>
        )}
      </header>
    </div>
  );
};
