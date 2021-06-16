import { useCallback, useEffect, useState, React } from 'react';
import { FiArrowDown, FiArrowUp, FiSearch, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import { maskCpf } from '../../Tools';
import Select from '../basics/Select';
// import SnackBar from '../SnackBar';
import './style.css';

export default (props) => {
  const [data, setData] = useState([
    { id: -1, name: '', qtd: 0, price: 0, value: 0 },
  ]);
  const [filtered, setFiltered] = useState('name');
  const [order, setOrder] = useState('asc');
  const [product, setProduct] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState(0);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const [cpf, setCpf] = useState('');
  const [customer, setCustomer] = useState('');

  /**
   * states snackbar
   */
  // const [open, setOpen] = React.useState(false);
  // const [severity, setSeverity] = React.useState('message');
  // const [message, setMessage] = React.useState('');

  useEffect(() => {
    window.addEventListener('resize', () => setWidthScreen(window.innerWidth));
  });

  useEffect(() => {
    try {
      api.get('/products/show').then((result) => {
        setData(
          result.data.map((prod) => {
            return {
              id: prod.id,
              name: prod.name,
              qtd: 1,
              price: parseFloat(prod.price),
              value: parseFloat(prod.price),
            };
          }),
        );
      });
    } catch (error) {
      alert('Error', error.message);
    }
  }, []);

  useEffect(() => {
    const aux = cpf.replace(/\D/g, '');
    if (aux.length === 11) {
      setCpf(maskCpf(aux));
    } else if (aux.length > 11) {
      alert('O cpf só pode ter 11 digitos');
      setCpf(aux.substring(0, 11));
    }
  }, [cpf]);

  const handleSale = async (e) => {
    try {
      e.preventDefault();
      var date = new Date();
      date.setDate(date.getDate() + 30);
      var dateString = date.toISOString().split('T')[0];
      const result = await api.post('/sales/create', {
        customer,
        amount: value,
        due_date: dateString,
        date_sale: new Date().toISOString().slice(0, 10),
        products: selectedProducts,
        colaborator: JSON.parse(localStorage.getItem('user'))[0],
      });
      if (result.status === 200) {
        alert('Venda realizada com sucesso!');
        setCustomer('');
        setValue(0);
        setSelectedProducts([]);
      } else {
        alert('Nao foi possivel realizar a venda!');
      }
    } catch (error) {
      alert('error foda ' + error.response.data.message || error.message);
    }
  };

  const orderProducts = (arr, prop, ord) => {
    const aux = arr.sort((a, b) => {
      const x = Number(a[prop]) || a[prop];
      const y = Number(b[prop]) || b[prop];
      if (ord === 'asc') {
        if (x < y) return -1;
        else if (x > y) return 1;
        else return 0;
      } else {
        if (x > y) return -1;
        else if (x < y) return 1;
        else return 0;
      }
    });
    return aux;
  };

  const addProducts = () => {
    const aux = [].concat(selectedProducts, product);
    setSelectedProducts(orderProducts(aux, filtered, order));
    setValue(
      aux.map(({ value }) => parseFloat(value)).reduce((acc, v) => acc + v),
    );
    setProduct({});
  };

  const handleFiltered = (filter) => {
    setFiltered(filter);
    setOrder('asc');
    setSelectedProducts(orderProducts(selectedProducts, filter, 'asc'));
  };

  const handleOrder = (or) => {
    setOrder(or);
    setSelectedProducts(orderProducts(selectedProducts, filtered, or));
  };

  const handleQtd = (v) => {
    setProduct({
      ...product,
      qtd: v,
      value: (v * product.price).toFixed(2),
    });
  };

  const handleDelete = (index) => {
    const aux = selectedProducts;
    aux.splice(index, 1);
    setSelectedProducts([].concat(aux));
    setValue(
      aux.length > 0
        ? aux.map(({ value }) => parseFloat(value)).reduce((acc, v) => acc + v)
        : 0,
    );
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      if (cpf.length === 0) {
        alert('Você precisa digitar um cpf.');
        return '';
      }
      const result = await api.get(`/customers/show/${cpf.replace(/\D/g, '')}`);
      console.log({ result: result.data });
      if (result.status === 200) {
        setCustomer(result.data);
      } else {
        setCustomer('');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      className={
        props.open
          ? 'sale-container sale-container-open-menu'
          : 'sale-container sale-container-closed-menu'
      }>
      <header className='sale-header'>
        <fieldset>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Digite o CPF do cliente para pesquisar'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <FiSearch onClick={(e) => handleSearch(e)} />
        </fieldset>
        {Object.keys(customer).length > 0 && (
          <>
            <div>
              <fieldset>
                <label htmlFor='name-cliente'>NOME</label>
                <input
                  type='text'
                  name='name-cliente'
                  id='name-cliente'
                  value={customer.name + ' ' + customer.lastname}
                  readOnly
                />
              </fieldset>
              <fieldset>
                <label htmlFor='cpf-cliente'>CPF</label>
                <input
                  type='text'
                  name='name-cliente'
                  id='cpf-cliente'
                  value={customer.cpf}
                  readOnly
                />
              </fieldset>
            </div>
            <div>
              <fieldset>
                <label htmlFor='email-cliente'>EMAIL</label>
                <input
                  type='text'
                  name='email-cliente'
                  id='email-cliente'
                  value={customer.email}
                  readOnly
                />
              </fieldset>
              <fieldset>
                <label htmlFor='tel-cliente'>TEL</label>
                <input
                  type='text'
                  name='tel-cliente'
                  id='tel-cliente'
                  value={customer.telephone}
                  readOnly
                />
              </fieldset>
            </div>
          </>
        )}
      </header>
      <aside className='select-products'>
        <Select
          options={data}
          placeholder='Selecione o produto'
          padding='2rem'
          selected={product}
          setSelected={(v) => {
            setProduct({ ...v, value: v.price ? v.price.toFixed(2) : 0 });
          }}
        />
        <fieldset>
          <legend>Quantidade</legend>
          <label htmlFor='qtd'>Quantidade:</label>
          <input
            type='number'
            name='qtd'
            id='qtd'
            min='1'
            value={product.qtd ? product.qtd : 1}
            onChange={(e) => handleQtd(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>Valor</legend>
          <label htmlFor='value'>Valor:</label>
          <strong>R$</strong>
          <input
            type='text'
            name='value'
            id='value'
            readOnly
            value={
              product.value
                ? product.value
                : product.price
                ? product.price.toFixed(2)
                : '0,00'
            }
          />
        </fieldset>
        <button
          className='addProducts'
          onClick={addProducts}
          disabled={Object.keys(product).length <= 3}>
          Adicionar
        </button>
      </aside>
      <main className='selected-products'>
        <div className='table-products'>
          <div className='hcell'></div>
          {Object.keys(selectedProducts[0] || data[0]).map((title, i) => {
            if (i === 0) return '';
            else if (widthScreen <= 1000 && title === 'price') return '';
            else
              return (
                <div key={title} className='hcell'>
                  {filtered === title &&
                    (order === 'asc' ? (
                      <FiArrowUp onClick={(e) => handleOrder('desc')} />
                    ) : (
                      <FiArrowDown onClick={(e) => handleOrder('asc')} />
                    ))}
                  <h4 onClick={(e) => handleFiltered(title)}>
                    {i === 1
                      ? 'Descrição'
                      : i === 2
                      ? 'Qtd.'
                      : i === 3
                      ? 'Unit.'
                      : 'Total'}
                  </h4>
                </div>
              );
          })}
          {selectedProducts.length > 0 &&
            selectedProducts.map((prod, i) => {
              return Object.values(prod).map((p, j) => {
                if (j === 0)
                  return (
                    <div key={j} className='mcell'>
                      <FiTrash2 onClick={() => handleDelete(i)} />
                    </div>
                  );
                else if (widthScreen <= 1000 && j === 3) return '';
                else {
                  return (
                    <div key={j} className='mcell'>
                      {j > 2
                        ? parseFloat(parseFloat(p).toFixed(2)).toLocaleString(
                            'pt-BR',
                            {
                              currency: 'BRL',
                              style: 'currency',
                              minimumFractionDigits: 2,
                            },
                          )
                        : p}
                    </div>
                  );
                }
              });
            })}
        </div>
      </main>
      <footer className='value-total-products'>
        <h1>
          {parseFloat(value.toFixed(2)).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2,
          })}
        </h1>
        <button
          disabled={selectedProducts.length === 0}
          onClick={(e) => handleSale(e)}>
          Confirmar
        </button>
      </footer>
    </div>
  );
};
