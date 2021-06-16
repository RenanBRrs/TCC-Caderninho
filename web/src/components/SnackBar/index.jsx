import React from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { AiOutlineWarning, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiMessageError } from 'react-icons/bi';
import './style.css';

export default (severity, action, message, time) => {
  React.useEffect(() => {
    setTimeout(() => {
      action(false);
    }, time);
  }, [action, time]);

  return (
    <div className={`snackbar-confirm-container ${severity}`}>
      <p>{message}</p>
      {severity === 'warning' ? (
        <AiOutlineWarning className='snackbar-confirm-button' title='fechar' />
      ) : severity === 'error' ? (
        <BiMessageError className='snackbar-confirm-button' title='fechar' />
      ) : severity === 'success' ? (
        <GiConfirmed className='snackbar-confirm-button' title='fechar' />
      ) : (
        <AiOutlineInfoCircle
          className='snackbar-confirm-button'
          title='fechar'
        />
      )}
    </div>
  );
};
