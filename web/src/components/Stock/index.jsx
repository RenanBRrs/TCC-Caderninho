import React from 'react';
import './style.css';

export default (props) => {
  return (
    <div
      className={
        props.open
          ? 'stock-container stock-container-open-menu'
          : 'stock-container stock-container-closed-menu'
      }>
      {/* <h1>Estoque</h1> */}

      <h3> | Cod. Produto  </h3>
      <h3> | Descrição do produto  </h3>
      <h3> | Unidade  </h3>
      <h3> | Preço de compra  </h3>
      <h3> | Preço de venda  </h3>
      <h3> | Saldo em estoque | </h3>
    </div>
  );
};
