import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UpdateServicePage = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }
    const {id} = useParams()
    const navigate = useNavigate()
    const [serviceToUpdate,setServiceToUpdate]=useState({})
    const [service, setService] = useState({
        name:'',
        description:'',
        price:''
    });

    const handleChange = (e) => {
        setService({
            ...service,
            [e.target.name]:e.target.value
        })
    }

    const getService = async() =>{
        try {
            const {data} = await axios(`http://localhost:3022/service/getOne/${id}`,{headers:headers})
            setServiceToUpdate(data.service)
        } catch (err) {
            console.error(err);
            throw new Error(err.response.data ||'Error getting service')
        }
    }

    const updateService = async() =>{
        try {
            const {data} = await axios.put(`http://localhost:3022/service/update/${id}`,service,{headers:headers})
            Swal.fire({
                title:data.message,
                grow:'row',
                width:'35%',
                icon:'success',
                allowEnterKey:true,
                allowEscapeKey:false,
                backdrop:true,
                background:' #24242c ',
                customClass:{
                    confirmButton:'btn btn-success border border-dark' 
                },
                buttonsStyling:false
            })
            if(data.updateService){
                navigate('/dashboard/services')
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title:'Error',
                text:err.response.data,
                grow:'row',
                width:'35%',
                icon:'error',
                allowEnterKey:true,
                allowEscapeKey:false,
                backdrop:true,
                background:' #24242c ',
                customClass:{
                    confirmButton:'btn btn-danger border border-dark' 
                },
                buttonsStyling:false
            })
            throw new Error(err.response.data ||'Error updatting service')
        }
    }
    
    useEffect(()=>{
        getService()
    },[])

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
                <h1 className="h2">Update Service</h1>

                {/* <button type="submit" className="btn btn-success border border-dark me-5 bi bi-plus-circle"> Create User</button> */}
                <button type="submit" className="btn btn-warning border border-dark btn-block mb-4" onClick={()=>updateService()} >Update Service</button>

            </div>

            <form className='ps-5 ps-5 pt-4 me-5'>

                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" defaultValue={serviceToUpdate.name} className="form-control" placeholder='Enter your name' maxLength="25" onChange={handleChange} name='name'/>
                            <label className="form-label" htmlFor="form6Example1">Name</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-3">
                    <input type="text" className="form-control" defaultValue={serviceToUpdate.description} placeholder='Enter the description' maxLength="200" onChange={handleChange} name='description' />
                    <label className="form-label" htmlFor="form6Example6">Description</label>
                </div>

                <div className="form-outline mb-3">
                    <input type="number" className="form-control" defaultValue={serviceToUpdate.price} placeholder='Enter the price' onChange={handleChange} name='price' />
                    <label className="form-label" htmlFor="form6Example3">Price</label>
                </div>

            </form>

        </>
    )
}
