import { useEffect, useState } from 'react';
import { FiChevronDown, FiPlus, FiSearch } from 'react-icons/fi';
import api from '../../services/api';
import { maskCpf } from '../../Tools';
// import Select from '../basics/Select';
import './style.css';

export default (props) => {
  const [clients, setClients] = useState([]);
  const [cpf, setCpf] = useState('');
  const [customer, setCustomer] = useState('');

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
      api.get('/customers/show/').then(({ data }) =>
        setClients(
          data.map((client) => {
            return {
              ...client,
              cpf: maskCpf(client.cpf),
            };
          }),
        ),
      );
    } catch (error) {
      alert(error.response.data.message || error.message);
    }
  });

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      if (cpf.length === 0) {
        alert('Você precisa digitar um cpf.');
        return '';
      }
      const result = await api.get(`/customers/show/${cpf.replace(/\D/g, '')}`);
      console.log({ result: result.data });
      if (result.status === 200) {
        setCustomer(result.data);
      } else {
        setCustomer('');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      className={
        props.open
          ? 'clients-container clients-container-open-menu'
          : 'clients-container clients-container-closed-menu'
      }>
      <div className='client-header'>
        <FiPlus />
        <fieldset>
          <legend>Pesquisar</legend>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Digite o CPF do cliente para pesquisar'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <FiSearch onClick={(e) => handleSearch(e)} />

          {Object.keys(customer).length > 0 && (
            <>
              <div>
                <fieldset>
                  <label htmlFor='name-cliente'>NOME</label>
                  <input
                    type='text'
                    name='name-cliente'
                    id='name-cliente'
                    value={customer.name + ' ' + customer.lastname}
                    readOnly
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor='cpf-cliente'>CPF</label>
                  <input
                    type='text'
                    name='name-cliente'
                    id='cpf-cliente'
                    value={customer.cpf}
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
                    value={customer.email}
                    readOnly
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor='tel-cliente'>TEL</label>
                  <input
                    type='text'
                    name='tel-cliente'
                    id='tel-cliente'
                    value={customer.telephone}
                    readOnly
                  />
                </fieldset>
              </div>
            </>
          )}
        </fieldset>
      </div>
      <div className='client-content'>
        <div className='client-table'>
          <div className='client-hcell'></div>
          {clients.length > 0 &&
            Object.keys(clients[0]).map((k) => {
              return <div className='client-hcell'>{/* <h4>{k}</h4> */}</div>;
            })}
          {clients.length > 0 &&
            clients.map((client, i) => {
              return Object.values(client).map((value, j) => {
                if (j === 9) {
                  return (
                    <>
                      <div className='client-bcell'>
                        <FiChevronDown />
                      </div>
                      <div className='client-bcell'>
                        <h5>{value}</h5>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div className='client-bcell'>
                      <h5>{j === 5 ? value.toString() : value}</h5>
                    </div>
                  );
                }
              });
            })}
        </div>
      </div>
    </div>
  );
};
