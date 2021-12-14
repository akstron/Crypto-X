import React,{useMemo} from 'react'
import './CoinsTable.css'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'

export const CoinsTable = ({allCoinsList}) => {
    console.log(allCoinsList)
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
                <h3>Coins</h3>
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
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
