import { useEffect, useState } from 'react';
// import { FiChevronDown, FiPlus, FiSearch } from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

export default (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      api.get('/products/show').then(({ data }) =>
        setProducts(
          data.map((products) => {
            return {
              ...products,
              // cpf: maskCpf(products.cpf),
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
          ? 'stock-container stock-container-open-menu'
          : 'stock-container stock-container-closed-menu'
      }>
      <div className='cima'>
        {products.length > 0 &&
          Object.keys(products[0]).map((k) => {
            return <div className='stock-hcell'></div>;
          })}
        {products.length > 0 &&
          products.map((stock, i) => {
            return Object.values(stock).map((value, j) => {
              if (j === 0) {
                return (
                  <>
                    <br></br>
                    <h4>Produto: {i + 1}</h4>
                    <div className='stock-bcell'>
                      <h5>ID: {value}</h5>
                    </div>
                  </>
                );
              } else {
                return (
                  <div className='stock-bcell'>
                    <h5>Marca: {j === 6 ? value.toString() : value}</h5>
                  </div>
                );
              }
            });
          })}
      </div>
    </div>
  );
};
