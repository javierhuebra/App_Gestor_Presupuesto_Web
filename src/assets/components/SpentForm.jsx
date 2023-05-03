import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';

import '../styles/SpentForm.css'

import savingIcon from '../images/icono_ahorro.png';
import foodIcon from '../images/icono_comida.png';
import houseIcon from '../images/icono_casa.png';
import miscllaneousIcon from '../images/icono_gastos.png';
import leisureIcon from '../images/icono_ocio.png';
import healthIcon from '../images/icono_salud.png';
import subscriptionsIcon from '../images/icono_suscripciones.png';

const dictionaryIcons = {
  saving: savingIcon,
  food: foodIcon,
  house: houseIcon,
  miscellaneous: miscllaneousIcon,
  leisure: leisureIcon,
  health: healthIcon,
  subscriptions: subscriptionsIcon
};





const SpentForm = ({ modalForm, setModalForm, handleBill, bill, setBill, deleteBill, setFilter }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('miscellaneous')
  const [id, setId] = useState('')
  const [date, setDate] = useState('')

  const options = [

    { value: 'saving', label: 'Saving' },
    { value: 'house', label: 'House' },
    { value: 'food', label: 'Food' },
    { value: 'miscellaneous', label: 'Miscellaneous Expenses' },
    { value: 'health', label: 'Helath' },
    { value: 'leisure', label: 'Leisure' },
    { value: 'subscriptions', label: 'Subscriptions' },
  ];



  const handleSubmit = (e) => {
    e.preventDefault()

    handleBill({ name, amount, category, id, date })

    /* console.log("categoria es", category)
    console.log("nombre es", name)
    console.log("valor es", amount, typeof amount) */

    console.log("se envio el form")
    if ([name, category, amount].includes('')) {
     return
    }
    setBill({})
    setName('')
    setAmount('')
    setCategory('miscellaneous')
    setId('')
    setDate('')

    setFilter('')
    


  }

  const handleClose = () => {
    setModalForm(false)

    setBill({})
    setName('')
    setAmount('')
    setCategory('miscellaneous')
    setId('')
    setDate('')

    console.log("se cerro el modal", bill)
  }

  useEffect(() => {
    if (bill?.name) {
      setName(bill.name)
      setAmount(bill.amount)
      setCategory(bill.category)
      setId(bill.id)
      setDate(bill.date)
    } else {
      /* console.log("no hay nada") */
    }
  }, [bill])

  return (

    <Modal show={modalForm} fullscreen={false} centered>
      <Modal.Header >
        <Button variant="warning" onClick={handleClose}>CANCEL</Button>
        {bill.id && <Button variant="danger"
          onClick={() => {
            deleteBill(id)
            setName('')
            setAmount('')
            setCategory('miscellaneous')
            setId('')
            setDate('')
          }}>DELETE</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4 className='tit-mod'>{bill.id ? 'Edit Spent' : 'New Spent'}</h4>

        <form onSubmit={handleSubmit}>
          <label
            className='label-spent-form'
            htmlFor="name"
          >
            Spent Name
          </label>

          <input
            autoComplete='off'
            className='input-mod'
            type="text"
            name='name'
            placeholder='Spent Name, ej. Food'
            value={name}
            onChange={(e) => setName(e.target.value)} />

          <label
            className='label-spent-form'
            htmlFor="name"
          >
            Spent Amount
          </label>
          <input
            autoComplete='off'
            className='input-mod'
            type="number"
            name='spent'
            placeholder='Spent Name, ej. Food'
            value={amount}
            onChange={(e) => setAmount(e.target.value)} />

          <label className='label-spent-form' htmlFor="categ">Spent Category</label>

          <div className='cont-select-img'>
            <div className='cont-select'>
              <Select
                options={options}
                onChange={(e) => setCategory(e.value)}
                
              />
            </div>

            {category && <img className='img-select' src={dictionaryIcons[category]} alt="img category" />}
          </div>

          <div className='cont-submit'>


          
            <Button className='btn-submit' as="input" type="submit" value={bill.id ? 'EDIT' : 'ADD SPENT'} />
          </div>

        </form>
      </Modal.Body>
    </Modal>



  )

}

export default SpentForm