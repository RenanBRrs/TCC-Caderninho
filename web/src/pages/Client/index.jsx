import { useState } from 'react';
import { FiArrowDown, FiArrowUp, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Container from '../../components/basics/Container';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import './style.css';
import Client from '../../components/Clients';

const customers_test = [
  {
    id: 0,
    name: 'teste',
    lastname: '0',
    cpf: '000',
    email: 't@0',
    is_deleted: false,
    is_admin: true,
    created_at: '2020-04-01',
  },
  {
    id: 1,
    name: 'teste',
    lastname: '1',
    cpf: '111',
    email: 't@1',
    is_deleted: true,
    is_admin: false,
    created_at: '2021-02-01',
  },
  {
    id: 2,
    name: 'teste',
    lastname: '2',
    cpf: '222',
    email: 't@2',
    is_deleted: false,
    is_admin: false,
    created_at: '2021-02-01',
  },
  {
    id: 3,
    name: 'teste',
    lastname: '3',
    cpf: '333',
    email: 't@3',
    is_deleted: false,
    is_admin: false,
    created_at: '2021-04-01',
  },
];

export default () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [customers, setCustomers] = useState(customers_test);

  return (
    <Container>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} setOpen={setOpenMenu} />
      <Client open={openMenu} setOpen={setOpenMenu} />
    </Container>
  );
};
