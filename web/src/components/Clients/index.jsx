import { useEffect, useState } from 'react';
import {
  FiArrowDown,
  FiChevronUp,
  FiArrowUp,
  FiChevronDown,
  FiPlus,
  FiSearch,
  FiTrash2,
} from 'react-icons/fi';
import api from '../../services/api';
import { maskCpf } from '../../Tools';
import Select from '../basics/Select';
import './style.css';

export default (props) => {
  const [clients, setClients] = useState([]);

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
            name='search-client'
            id='search-client'
            placeholder='Digite o CPF para pesquisar!'
          />
          <FiSearch />
        </fieldset>
      </div>
      <div className='client-content'>
        <div className='client-table'>
          <div className='client-hcell'></div>
          {clients.length > 0 &&
            Object.keys(clients[0]).map((k) => {
              return (
                <div className='client-hcell'>
                  <h4>{k}</h4>
                </div>
              );
            })}
          {clients.length > 0 &&
            clients.map((client, i) => {
              return Object.values(client).map((value, j) => {
                if (j === 0) {
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
