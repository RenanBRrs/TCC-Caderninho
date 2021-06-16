import { useState } from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Container from '../../components/basics/Container';

export default () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Container>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} setOpen={setOpenMenu} />
    </Container>
  );
};
