
import Bill from './Bill'
import '../../index.css'
import '../styles/SpentList.css'

const SpentList = ({ bills, setModalForm, setBill, filter, filterBills, setFilter }) => {
    return (
        <>
            <p className='tit-list'>Spent List</p>
            <div className='cont-sepnt-list'>

            

                {filter ? filterBills.map(bill => (

                    <Bill
                        key={bill.id}
                        bill={bill}
                        setModalForm={setModalForm}
                        setBill={setBill}
                    />
                )) : bills.map(bill => (
                    <Bill
                        key={bill.id}
                        bill={bill}
                        setModalForm={setModalForm}
                        setBill={setBill}
                    />
                ))}


                {
                    (bills.length === 0) && (
                        <div className='card-container no-gastos'>

                            <p>There are no expenses</p>
                        </div>
                    )
                }

                {
                    (filterBills.length === 0 && bills.length !== 0 && filter !== '') && (
                        <div className='card-container no-gastos'>
                            <p>There are expenses but not in this category</p>
                        </div>
                    )
                }



            </div>
        </>
    )
}

export default SpentList