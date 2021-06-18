import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import truck from '../../assets/truck-1.svg';
import register from '../../assets/cadastro.svg';
import report from '../../assets/sale-statistics.svg';
import cart from '../../assets/cart-1.svg';
import people from '../../assets/people.svg';
import Menu from '../basics/Menu';
import './style.css';

export default (props) => {
  return (
    <Menu>
      {props.open ? (
        <FiArrowLeft
          className='arrow-menu'
          onClick={(e) => props.setOpen(false)}
        />
      ) : (
        <FiArrowRight
          className='arrow-menu'
          onClick={(e) => props.setOpen(true)}
        />
      )}
      <Link
        className={
          props.open
            ? 'menu-option menu-option-active'
            : 'menu-option menu-option-disabled'
        }
        to='/AddClient'>
        <img alt='Folha cadastro' src={register} />
        <strong className={props.open ? 'menu-active' : 'menu-disabled'}>
          Cadastro
        </strong>
      </Link>
      <Link
        className={
          props.open
            ? 'menu-option menu-option-active'
            : 'menu-option menu-option-disabled'
        }
        to='/relatorio'>
        <img alt='Gráfico relatórios' src={report} />
        <strong className={props.open ? 'menu-active' : 'menu-disabled'}>
          Relatórios
        </strong>
      </Link>
      <Link
        className={
          props.open
            ? 'menu-option menu-option-active'
            : 'menu-option menu-option-disabled'
        }
        to='/venda'>
        <img alt='Carrinho de compras' src={cart} />
        <strong className={props.open ? 'menu-active' : 'menu-disabled'}>
          Venda
        </strong>
      </Link>
      <Link
        className={
          props.open
            ? 'menu-option menu-option-active'
            : 'menu-option menu-option-disabled'
        }
        to='/client'>
        <img alt='Avatares Humanos' src={people} />
        <strong className={props.open ? 'menu-active' : 'menu-disabled'}>
          Cliente
        </strong>
      </Link>
      <Link
        className={
          props.open
            ? 'menu-option menu-option-active'
            : 'menu-option menu-option-disabled'
        }
        to='/estoque'>
        <img alt='Caminhão' src={truck} />
        <strong className={props.open ? 'menu-active' : 'menu-disabled'}>
          Estoque
        </strong>
      </Link>
    </Menu>
  );
};
