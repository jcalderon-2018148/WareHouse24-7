import React from 'react'

export const Thead = ({headerGroups}) => {
  return (
    <thead>
        {
            headerGroups.map((headerGroup)=>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column,index)=>(
                            <th key={index}>
                                {
                                    column.render('Header')
                                }
                            </th>
                            
                        ))
                    }
                    <th scope="col" className='text-center'>ACTIONS</th>
                </tr>
            ))
        }
    </thead>
  )
}
