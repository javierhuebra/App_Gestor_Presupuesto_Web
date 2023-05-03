import '../styles/NewBudget.css'
import '../../index.css'

import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';

const NewBudget = ( {budget, setBudget, setIsValidBudget, swalWithBootstrapButtons}) => {
    
    
    const handleBudget = (e) =>{
        e.preventDefault();
        

        budget>0 ? 

        setIsValidBudget(true) : 
        
        swalWithBootstrapButtons.fire({
            title: 'Error!',
            text: 'The budget cannot be 0 or negative',
            icon: 'error',
            confirmButtonText: 'I understand'
          })
        
    }


    return (
        <div className='card-container'>
            <div className='content'>
                <p className='define'>Define Budget</p>

                <form className='form' onSubmit={handleBudget}>
                    <input 
                    className='input-budget' 
                    type="number" 
                    placeholder='Add your Budget - Ej. $300,000' 
                    value={budget}
                    autoComplete="false"
                    onChange={(e)=>setBudget(parseFloat(e.target.value))}
                    
                    />
                     <Button as="input" type="submit" value="ADD BUDGET" />
                </form>

            </div>
        </div>
    )
}

export default NewBudget