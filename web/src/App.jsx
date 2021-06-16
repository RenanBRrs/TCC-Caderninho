import Routes from './router';
import './app.css';
import Select from './components/basics/Select';
import { useEffect, useState } from 'react';

/**
 * 
 * @returns 'id'
'name'
'product_brand'
'price'
'is_deleted'
'created_at'
'updated_at'
'deleted_at'
 */

const data = [
  { id: 0, name: 'Leite', qtd: 1, price: 4.0 },
  { id: 1, name: 'Erva', qtd: 1, price: 6.0 },
  { id: 2, name: 'Refrigerante', qtd: 1, price: 8.0 },
  { id: 3, name: 'Miojo', qtd: 1, price: 1.2 },
];

export default function App() {
  const [product, setProduct] = useState({});
  // useEffect(() => {
  //   console.log({ product });
  // }, [product]);
  return <Routes />;
  // return (
  //   <Select
  //     options={data}
  //     placeholder='Selecione o produto'
  //     selected={product}
  //     setSelected={(v) => setProduct(v)}
  //   />
  // );
}
