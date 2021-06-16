import { useState } from 'react';
import { FiArrowDown, FiArrowUp, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Container from '../../components/basics/Container';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Stock from '../../components/Stock';
import './style.css';

const stock_test = [
  {
    cod: 0,
    descricao: 'Feijao',
    unidade: 'Sc',
    preco_compra: '4,25',
    preco_venda: '6,50',
    saldo: '10',
    is_deleted: false,
    is_admin: true,
    created_at: '2020-04-01',
  },
  {
    cod: 1,
    descricao: 'Arroz',
    unidade: 'Sc',
    preco_compra: '5,50',
    preco_venda: '6,75',
    saldo: '10',
    is_deleted: false,
    is_admin: true,
    created_at: '2020-04-01',
  },
  {
    cod: 3,
    descricao: 'Pepsi',
    unidade: 'Lt',
    preco_compra: '7,20',
    preco_venda: '9,25',
    saldo: '10',
    is_deleted: false,
    is_admin: true,
    created_at: '2020-04-01',
  },
  {
    cod: 4,
    descricao: 'Coca Cola',
    unidade: 'Lt',
    preco_compra: '7,99',
    preco_venda: '9,50',
    saldo: '10',
    is_deleted: false,
    is_admin: true,
    created_at: '2020-04-01',
  },
];

export default () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [stock, setStock] = useState(stock_test);

  return (
    <Container>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} setOpen={setOpenMenu} />
      <Stock open={openMenu} setOpen={setOpenMenu} />
    </Container>
  );
};