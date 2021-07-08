import './style.css';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { useState } from 'react';
import React from 'react';

export default (props) => {
  const [open, setOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [options, setOptions] = useState([]);

  const handleOpenMenu = () => {
    setOpen(true);
    if (props.selected.length && !isSelect) {
      setOptions(
        props.options.filter(
          ({ name }) =>
            name.toLowerCase().indexOf(props.selected.toLowerCase()) !== -1,
        ),
      );
    } else {
      setOptions(props.options);
    }
  };
  const handleClickSelect = (event, product) => {
    if (event.type === 'blur') {
      props.setSelected({});
    } else {
      setIsSelect(true);
      props.setSelected(product);
      setOpen(!open);
    }
  };
  const handleClickRemove = (product) => {
    setIsSelect(false);
    props.setSelected({});
  };
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const v = e.target.value;
    const aux = props.options.filter(
      ({ name }) => name.toLowerCase().indexOf(v.toLowerCase()) !== -1,
    );
    setOptions(aux);
    props.setSelected({ ...props.selected, name: v });
  };
  const handleCloseMenu = (e) => {
    setOpen(false);
  };
  return (
    <div
      className='select-container'
      style={{ left: props.padding, right: props.padding }}>
      <div className='select-input'>
        <input
          onFocus={handleOpenMenu}
          onBlur={(e) => handleClickSelect(e)}
          type='text'
          name='select-search'
          id='select-search'
          placeholder={props.placeholder || 'Selecione...'}
          value={props.selected.name || ''}
          onChange={handleSearch}
          disabled={isSelect}
        />
        {isSelect && (
          <FiX
            size={18}
            className='select-remove'
            onClick={handleClickRemove}
          />
        )}
        {open ? (
          <FiChevronUp
            className='select-open'
            size={24}
            onClick={handleCloseMenu}
          />
        ) : (
          <FiChevronDown
            className='select-open'
            size={24}
            onClick={handleOpenMenu}
          />
        )}
      </div>
      {open && (
        <div className='select-options'>
          {options.map((option) => {
            return (
              <button
                key={option.id}
                onClick={(e) => handleClickSelect(e, option)}>
                {option.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
