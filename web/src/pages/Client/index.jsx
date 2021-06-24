import { useState } from 'react';
import Container from '../../components/basics/Container';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import './style.css';
import Client from '../../components/Clients';

export default () => {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <Container>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} setOpen={setOpenMenu} />
      <Client open={openMenu} setOpen={setOpenMenu} />
    </Container>
  );
};
