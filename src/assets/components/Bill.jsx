import '../../index.css'
import '../styles/Bill.css'

import { formatQuant, formatDate } from '../helpers';


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
  
const Bill = ({bill, setBill, setModalForm}) => {

    const {name, date, amount, category} = bill

    const handleActions = () => {
        setModalForm(true)
        setBill(bill)
    }

    return(
        <div className='card-container cont-bill'
            onClick={handleActions}        
        >
            <div className='image-container'>
                <img className='img-cat' src={dictionaryIcons[category]} alt="category image" />

                <div className='data-container'>
                    <p className='info-text text-cat'>{category}</p>
                    <p className='info-text text-name'>{name}</p>
                    <p className='info-text text-date'>{formatDate(date)}</p>
                </div>
            </div>
            <p className='info-text text-amount'>-{formatQuant(amount)}</p>
           
        </div>
    )
}

export default Bill