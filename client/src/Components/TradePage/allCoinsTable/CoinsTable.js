import React,{useMemo} from 'react'
import './CoinsTable.css'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'

const handleRowClick=(event,row)=>{
    console.log(row.original);
}

export const CoinsTable = ({allCoinsList}) => {
    const columns = useMemo(()=>COLUMNS,[])
    const data = useMemo(()=>allCoinsList,[allCoinsList])
    const tableinstance = useTable(
        {
            columns,
            data,
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableinstance

    return (
        <div className='div-coinsList'>
        <div className="CoinList-Heading">
                <h4>Coins</h4>
                <h7>( Select the coin you want to Sell/Buy )</h7>
        </div>
        <div className='coinsTable'>
            
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                            // return <td {...cell.getCellProps()} {...row.getRowProps({onClick:(event)=>{handleRowClick(event,row)}})} >{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>

    )
}
