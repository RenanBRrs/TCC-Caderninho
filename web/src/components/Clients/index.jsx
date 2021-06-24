import { useEffect, useState } from 'react';
import api from '../../services/api';

import './style.css';

export default (props) => {
  const [sales, setSale] = useState([]);

  useEffect(() => {
    try {
      api.get('/customers/show').then(({ data }) => {
        setSale(data);
      });
    } catch (error) {
      alert(error.response.data.message || error.message);
    }
  }, []);
  return (
    <div
      className={
        props.open
          ? 'sales-container sales-container-open-menu'
          : 'sales-container sales-container-closed-menu'
      }>
      <div className='cima'>
        {sales.length > 0 &&
          sales.map((sale, i) => {
            return (
              <div key={i}>
                <br></br>
                <h4>Cliente:</h4>
                <div className='clients-bcell'>
                  <h5>Nome : {sale.name} </h5>
                  <h5> Sobrenome : {sale.lastname} </h5>
                  <h5>CPF : {sale.cpf} </h5>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
