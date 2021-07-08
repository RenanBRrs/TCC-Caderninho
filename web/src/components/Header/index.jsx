import './style.css';
import { FiArrowLeft, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import Header from '../basics/Header';
import { useEffect, useState } from 'react';

export default (props) => {
  const [name, setName] = useState('Fulano');

  useEffect(() => {
    const aux = JSON.parse(localStorage.getItem('user'))[0];
    setName(aux.name.toLowerCase());
  });

  const handleExit = async (e) => {
    localStorage.clear();
  };
  return (
    <Header open={props.open}>
      {props.open ? (
        <FiArrowLeft
          className='open-menu closed-menu'
          onClick={() => props.setOpen(false)}
        />
      ) : (
        <FiMenu
          className='open-menu closed-menu'
          onClick={() => props.setOpen(true)}
        />
      )}
      <h3>CADERNINHO</h3>
      {/* <fieldset className='search'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Procurar...'
        />
        <FiSearch />
      </fieldset>
      <div className='notification'>
        <FiBell />
        <p>1</p>
      </div> */}
      <div className='user-content'>
        <img src={avatar} alt='avatar do usuário' />
        <p className='user'>
          Olá, <strong>{name}!</strong>
        </p>
      </div>
      <div>
        <Link to='/'>
          <strong>
            <p onClick={(e) => handleExit(e)}>SAIR</p>
          </strong>
        </Link>
      </div>
    </Header>
  );
};
