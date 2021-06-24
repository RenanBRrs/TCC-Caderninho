import { useEffect, useState } from 'react';
import api from '../../services/api';

import './style.css';

export default (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      api.get('/products/show').then(({ data }) => {
        setProducts(data);
      });
    } catch (error) {
      alert(error.response.data.message || error.message);
    }
  }, []);

  return (
    <div
      className={
        props.open
          ? 'stock-container stock-container-open-menu'
          : 'stock-container stock-container-closed-menu'
      }>
      <div className='cima'>
        {products.length > 0 &&
          products.map((sale, i) => {
            return (
              <div key={i}>
                <br></br>
                <h4>Produto:</h4>
                <div className='stock-bcell'>
                  <h5>Nome : {sale.name} </h5>
                  <h5> Marca : {sale.product_brand} </h5>
                  <h5>PREÇO : {sale.price} </h5>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
