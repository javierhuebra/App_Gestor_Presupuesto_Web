
import './App.css'
import { useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from 'react-bootstrap/Button';

import Header from './assets/components/Header'
import NewBudget from './assets/components/NewBudget'
import InfoModal from './assets/components/InfoModal'
import ControlBudget from './assets/components/ControlBudget'
import SpentForm from './assets/components/SpentForm'
import SpentList from './assets/components/SpentList';
import Filter from './assets/components/Filter';

import Swal from 'sweetalert2'

import { generateId } from '../src/assets/helpers/index'

import googleImg from '../src/assets/images/getitplaystore.png'

const Msg = (/* { closeToast, toastProps } */) => (
  <a className='ancor' href="https://play.google.com/store/apps/details?id=com.notes.planner" target='blank_'>
    <div>
      Remember that the performance of this App will be better if you install it on your mobile

      <img className='logo-google' src={googleImg} alt="" />

    </div>
  </a>

)

function App() {

  const [budget, setBudget] = useState('')
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [modalForm, setModalForm] = useState(false)

  const [bill, setBill] = useState({})
  const [bills, setBills] = useState([])
  const [filter, setFilter] = useState('')
  const [filterBills, setFilterBills] = useState([])

  const [showCartelito, setShowCartelito] = useState(true)



  const displayMsg = () => {
    toast(<Msg />)
    // toast(Msg) would also work
  }

  const handleBtnPlus = () =>{
    setModalForm(true)
    setShowCartelito(false)
  }

  useEffect(() => {
    const obtainBudgetStorage = async () => {
      try {
        const budgetStorage = window.localStorage.getItem('planner_budget') ?? 0 //esta bueno el operador para constatar que no sea null
        console.log('tenes ', budgetStorage)

        if (budgetStorage > 0) {
          setBudget(budgetStorage)
          setIsValidBudget(true)

        }


      } catch (error) {
        console.log(error)
      }

    }
    obtainBudgetStorage()
  }, [])

  useEffect(() => {
    if (isValidBudget) {
      const saveBudgetStorage = () => {
        try {
          window.localStorage.setItem('planner_budget', budget)
          console.log('tengo alguito')
        } catch (error) {
          console.log(error)
        }
      }
      saveBudgetStorage(); //invoco a la funcion 
    }
  }, [isValidBudget])


  useEffect(() => {
    const obtainBillsStorage = () => {
      try {
        const billsStorage = window.localStorage.getItem('planner_bills')

        setBills(billsStorage ? JSON.parse(billsStorage) : [])

        console.log('gastos en storage', billsStorage)
      } catch (error) {
        console.log(error)
      }
    }
    displayMsg()
    obtainBillsStorage()
  }, [])

  useEffect(() => {
    const saveBillsStorage = () => {
      try {
        window.localStorage.setItem('planner_bills', JSON.stringify(bills))
      } catch (error) {
        console.log(error)
      }
    }
    saveBillsStorage(); //invoco a la funcion 
  }, [bills])

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const swalWithOthersBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger btn-edit',
      cancelButton: 'btn btn-warning'
    },
    buttonsStyling: false
  })

  const handleBill = (bill) => {
    if ([bill.name, bill.category, bill.amount].includes('')) {
      swalWithBootstrapButtons.fire({
        title: 'Error!',
        text: 'You must select all the requirements of the form (Spent name, Spent amount and Spent category',
        icon: 'error',
        confirmButtonText: 'I understand'
      })

      return
    }
    if (bill.id) {
      const updatedBills = bills.map(billState => billState.id === bill.id ? bill : billState)
      setBills(updatedBills)
    } else {
      //Añadir el nuevo gasto al state

      bill.id = generateId()

      bill.date = Date.now()

      setBills([...bills, bill])
    }

    setModalForm(!modalForm)

    console.log(bills)
  }

  const deleteBill = id => {

    swalWithOthersBootstrapButtons.fire({
      title: 'Desea eliminar el',
      text: { id },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBills = bills.filter(billState => billState.id !== id)
        const updatedFilterBills = bills.filter(billState => billState.id !== id) //para el filtro


        setBills(updatedBills)
        setFilterBills(updatedFilterBills)
        setModalForm(!modalForm)
        setBill({})

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Your expense has been removed',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }

  const resetApp = id => {

    swalWithOthersBootstrapButtons.fire({
      title: 'Do you want to reset the app?',
      text: 'This will eliminate budget and expenses',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          window.localStorage.clear()
          setIsValidBudget(false)
          setBudget('')
          setBills([])

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'The app has been reset',
            showConfirmButton: false,
            timer: 1500
          })
        } catch (error) {
          console.log(error)
        }




      }
    })

  }




  return (

    <div className='app-container'>

      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}

          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={true}
          theme="light"
        />
      </div>
      <div className='parte-superior'>
        <Header />
        <InfoModal

          show={modalShow}
          onHide={() => { setModalShow(false) }}


        />
        <SpentForm
          modalForm={modalForm}
          setModalForm={setModalForm}
          deleteBill={deleteBill}
          handleBill={handleBill}

          bill={bill}
          setBill={setBill}

          setFilter={setFilter}
        />

        {isValidBudget ?
          <ControlBudget
            budget={budget}
            bills={bills}
            resetApp={resetApp}
          /> :
          <>
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              setIsValidBudget={setIsValidBudget}
              swalWithBootstrapButtons={swalWithBootstrapButtons}

            />






          </>
        }

      </div>

      <div className='parte-inferior'>
        {!isValidBudget &&
          <>
            <Button variant="success"

              onClick={() => setModalShow(true)}
            >
              Info

            </Button>

            <a className='ancor' href="https://play.google.com/store/apps/details?id=com.notes.planner" target='blank_'>
              <img className='logo-google' src={googleImg} alt="" />
            </a>
          </>
        }

        {isValidBudget &&
          <>
            <Filter
              setFilter={setFilter}
              filter={filter}

              bills={bills}
              setFilterBills={setFilterBills}
            />

            <SpentList
              bills={bills}
              setModalForm={setModalForm}
              setBill={setBill}

              filter={filter}
              filterBills={filterBills}

              setFilter={setFilter}
            />


            <div className='cont-btn-plus'>
              {showCartelito &&
                <div className='cartelito'>
                  <p className='tit-cartelito'>Help Tip</p>
                  <div className='cont-cartelito'>
                    <p className='text-catelito'>To upload a new expense, click the button</p>
                    <p className='text-catelito flecha'>↓</p>
                  </div>
                </div>}

              <button
                className='btn-plus'
                onClick={() => handleBtnPlus()}
              >
                +
              </button>
            </div>


          </>

        }
      </div>

    </div >


  )
}

export default App
