import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import photo from '../../assets/property-1.jpg'
import { Link } from 'react-router-dom'
import { Table } from '../../components/Table'
import axios from 'axios'

export const ServicePage = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }
    const [services,setServices] = useState([])
    const getServices = async() =>{
        try {
            const {data} = await axios('http://localhost:3022/service/get',{headers:headers})
            setServices(data.services);          
        } catch (err) {
            console.error(err);
        }
    }
    
useEffect(()=>{
    getServices()
},[])

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Services</h1>
                <Link to='/dashboard/addService'>
                    <button className='btn btn-success border border-dark me-5 bi bi-plus-circle'> Add Service</button>
                </Link>
                
            </div>

            <div className="table-responsive">
                {
                    <Table
                    values={services}
                    nameRuta={'Service'}/>
                }
                {/* <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Names</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col" className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='align-middle'>
                        <tr>
                            <td>{name}</td>
                            <td>{description}</td>
                            <td>{price}</td>
                            <td className='text-center'>
                                <button className='btn btn-danger border border-dark bi bi-trash3 ms-1 mt-1 mb-1'> Delete</button>
                                <button className='btn btn-warning border border-dark bi bi-pencil ms-1 mt-1 mb-1'> Update</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Gerson Aarón</td>
                            <td>Matta Aguilar</td>
                            <td>12345678</td>
                            <td className='text-center'>
                                <button className='btn btn-danger border border-dark bi bi-trash3 ms-1 mt-1 mb-1'> Delete</button>
                                <button className='btn btn-warning border border-dark bi bi-pencil ms-1 mt-1 mb-1'> Update</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Gerson Aarón</td>
                            <td>Matta Aguilar</td>
                            <td>12345678</td>
                            <td className='text-center'>
                                <button className='btn btn-danger border border-dark bi bi-trash3 ms-1 mt-1 mb-1'> Delete</button>
                                <button className='btn btn-warning border border-dark bi bi-pencil ms-1 mt-1 mb-1'> Update</button>
                            </td>
                        </tr>


                    </tbody>
                </table> */}
            </div>
        </>
    )
}
