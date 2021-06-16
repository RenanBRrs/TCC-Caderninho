import './style.css';

export default (props) => {
  return <nav className='menu menu-position'>{props.children}</nav>;
};
