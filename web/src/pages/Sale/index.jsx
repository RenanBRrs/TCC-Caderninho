import { useState } from 'react';
import { FiArrowDown, FiArrowUp, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Container from '../../components/basics/Container';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import './style.css';
import Sale from '../../components/Sales';

export default () => {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <Container>
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} setOpen={setOpenMenu} />
      <Sale open={openMenu} setOpen={setOpenMenu} />
    </Container>
  );
};
