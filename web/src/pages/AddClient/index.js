import { useState } from 'react';
import Container from '../../components/basics/Container';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import './style.css';
import AddClient from '../../components/AddClient';

export default () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [customers, setCustomers] = useState('');

  return (
    <Container>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} setOpen={setOpenMenu} />
      <AddClient open={openMenu} setOpen={setOpenMenu} />
    </Container>
  );
};
