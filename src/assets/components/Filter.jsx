import '../../index.css'
import '../styles/Filter.css'

import { useEffect } from 'react';

import {options} from '../helpers/index'

import Select from 'react-select';

console.log(options)
const Filter = ({filter, setFilter, bills, setFilterBills}) => {

    useEffect(() => {
        if(filter === ''){
            setFilterBills([])
        }else{
            const filterBills = bills.filter( bill => bill.category === filter)
            setFilterBills(filterBills)
    
            console.log(filterBills)
            console.log("filter", filter)
    
        }
    },[filter])

    return (
        <div className='filtro-cont'>
            <div className='card-container card-mia'>
                <p>Filter Spent</p>
            <Select
                options={options}
                
                onChange={(e) => setFilter(e.value)}

              />
            </div>
        </div>
    )
}

export default Filter