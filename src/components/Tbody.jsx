import React from 'react'
import { Link } from 'react-router-dom'

export const Tbody = ({getTableBodyProps,rows,prepareRow,nameRuta}) => {
  return (
    <tbody {...getTableBodyProps}>
        {
            rows.map((row)=>{
                prepareRow(row)
                return(
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map((cell)=>{
                                return(
                                    <td {...cell.getCellProps()}>
                                        {
                                            cell.render('Cell')
                                        }
                                    </td>
                                    
                                )
                            })
                        }
                                    <td className='text-center'>
                                        <Link to={`/dashboard/update${nameRuta}/${row.original._id}`}>
                                            <button className='btn btn-warning border border-dark bi bi-pencil ms-1 mt-1 mb-1'> Update</button>
                                        </Link>
                                    </td>
                    </tr>
                )
            })
        }
    </tbody>
  )
}
