import './style.css';
export default (props) => {
  return (
    <header className={props.open ? 'header header-width' : 'header'}>
      {props.children}
    </header>
  );
};
