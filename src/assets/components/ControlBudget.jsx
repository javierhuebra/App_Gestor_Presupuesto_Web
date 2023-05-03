import '../../index.css'
import '../styles/ControlBudget.css'


import { useState, useEffect } from 'react'


import { formatQuant } from '../helpers/index'
import { Circle } from 'rc-progress'

import Button from 'react-bootstrap/Button';

const ControlBudget = ({ budget, bills, resetApp }) => {

    const [aviable, setAviable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        /* console.log('use effect') */
        const totalSpent = bills.reduce((total, spen) => Number(spen.amount) + total, 0) //Metodos de arrays de javascript para sumar todo lo de un arreglo de objetos o arreglo normal
        const totalAviable = budget - totalSpent

        const newPercent = ((budget - totalAviable) / budget) * 100

        setSpent(totalSpent)
        setAviable(totalAviable)
        setPercent(Math.trunc(newPercent))
        /*  console.log(newPercent)  */

    }, [bills])

    

    return (
        <div className='card-container'>
            <div className='content-cb'>
                <div className='circle-container'>
                    <div className='text-percent-cont'><p className={`text-percent ${percent>100 && 'red-over-budget'}`} >{percent}%</p> {percent>100 && <p className='red-over-budget'>Over Budget</p>}</div>

                    <Circle percent={ percent>100 ? 100 : percent} strokeWidth={8} trailWidth={8} strokeColor={ percent>100 ? 'red' : '#3b82f6'} gapDegree={0} />
                </div>
                <Button className='boton-bootstrap' variant="danger" onClick={resetApp}>RESTART APP</Button>
                <p className='text-indicators'>Budget: <span className='text-ind-value'>{formatQuant(budget)}</span></p>
                <p className='text-indicators'>Spent: <span className='text-ind-value'>{formatQuant(spent)}</span></p>
                <p className='text-indicators'>Aviable: <span className='text-ind-value'>{formatQuant(aviable)}</span></p>
            </div>

        </div>
    )
}

export default ControlBudget