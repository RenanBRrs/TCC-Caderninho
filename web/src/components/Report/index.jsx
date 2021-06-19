import { useEffect, useState } from 'react';
import api from '../../services/api';

import './style.css';

export default (props) => {
  const [sales, setSale] = useState([]);
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    try {
      api.get('/sales/show').then(({ data }) =>
        setSale(
          data.map((sale) => {
            return {
              ...sale,
              //   cpf: maskCpf(client.cpf),
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
          ? 'sales-container sales-container-open-menu'
          : 'sales-container sales-container-closed-menu'
      }>
      <div className='cima'>
        {sales.length > 0 &&
          Object.keys(sales[0]).map((k) => {
            return <div className='sale-hcell'></div>;
          })}
        {sales.length > 0 &&
          sales.map((sale, i) => {
            return Object.values(sale).map((value, j) => {
              if (j === 0) {
                return (
                  <>
                    <br></br>
                    <h4>Venda: {i + 1}</h4>
                    <div className='sale-bcell'>
                      <h5>ID: {value} </h5>
                    </div>
                  </>
                );
              } else {
                return (
                  <div className='sale-bcell'>
                    <h5>{j === 6 ? value.toString() : value}</h5>
                  </div>
                );
              }
            });
          })}
      </div>
    </div>
  );
};
