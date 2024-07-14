import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import { Thead } from './Thead'
import { Tbody } from './Tbody'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const Table = ({values,nameRuta}) => {
    const [columns,setColumns] = useState([])
    const data = values 

    const getKeys = () =>{
        let keys = Object.keys(values[0])
        keys.shift()
        let showHeaders = []
        for(let hola of keys){
            showHeaders.push({
                Header: hola.toUpperCase(),
                accessor: hola
            })
        }
        setColumns(showHeaders);
    }

    let tabloide = useTable({columns,data})
    const {getTableProps, getTableBodyProps, headerGroups,footerGroups,rows,
           prepareRow, preGlobalFilteredRows, setGlobalFilter, state} = tabloide
    
    useEffect(()=>{
        if(values){
            if(values.length !== 0){
                getKeys()
            }
        }else{
            Swal.fire({
                title:'There is not data yet',
                grow:'row',
                width:'35%',
                icon:'info',
                allowEnterKey:true,
                allowEscapeKey:false,
                backdrop:true,
                background:' #24242c ',
                customClass:{
                    confirmButton:'btn btn-success border border-dark' 
                },
                buttonsStyling:false
            })
        }
    },[values])

    return (
    <>
         <table className="table table-striped" {...getTableProps}>
            <Thead headerGroups={headerGroups}/>
            <Tbody getTableBodyProps={getTableBodyProps} rows={rows} prepareRow={prepareRow} nameRuta={nameRuta}/>
        </table> 
                 {/* <thead>
                    <tr>        
                        {
                            headers.map((e,index)=>{
                                return(
                                    <th scope="col" key={index}>{e}</th>
                                )
                            })
                        }       
                        
                            <th scope="col" className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    { 
                        values.map((e,index)=>{
                            return (
                                <tr key={index}>
                                    {
                                        showValues(e)
                                    }
                                    <td className='text-center'>
                                        <button className='btn btn-danger border border-dark bi bi-trash3 ms-1 mt-1 mb-1'> Delete</button>
                                        <Link to={`/dashboard/updateService/${e._id}`}>
                                            <button className='btn btn-warning border border-dark bi bi-pencil ms-1 mt-1 mb-1'> Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }) 
                    }
                    
                </tbody>  */}
    </>
  )
}
