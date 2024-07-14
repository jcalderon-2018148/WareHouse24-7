import React, { useEffect } from 'react'
import './styleUser.css'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateUserPage = () => {
    const { id } = useParams()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [form, setForm] = useState({
        names: '',
        surnames: '',
        email: '',
        phone: '',
        username: ''
    })
    const [photo, setPhoto] = useState()

    const getUser = async() => {
        try {
            let { data } = await axios(`http://localhost:3022/user/get/${id}`, {headers: headers})

            if(data.user) {
                setUser(data.user)
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoto = (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        setPhoto(formData)
    }

    const update = async() => {
        try {
            let datos = {
                names: document.getElementById('names').value,
                surnames: document.getElementById('surnames').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                username: document.getElementById('username').value
            }
            let { data } = await axios.put(`http://localhost:3022/user/update/${id}`, datos, {headers: headers})

            if(photo) {
                await axios.put(
                    `http://localhost:3022/user/uploadImg/${data.user._id}`, 
                    photo, 
                    { headers: 
                        {'Authorization': localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'} 
                    })
            }
            if(data.user) {
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            }

            navigate('/dashboard/users')
            
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const handlePhone = (e) => {
        const value = e.target.value;
        if (value.length <= 8) {
            setUsername(value);
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    
    
    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
                <h1 className="h2">Update User</h1>
                

            </div>
            <Link to={'/dashboard/users'}>
                <button type="submit" className="btn btn-danger btn-block m-2">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-warning btn-block m-2" onClick={update}>Update User</button>

            <form className='ps-5 ps-5 pt-4 me-5'>

                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="names" className="form-control" placeholder='Enter your names' maxLength="25" defaultValue={user.names} onChange={handleForm}/>
                            <label className="form-label" htmlFor="form6Example1">Names</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="surnames" className="form-control" placeholder='Enter your surnames' maxLength="25" defaultValue={user.surnames} onChange={handleForm}/>
                            <label className="form-label" htmlFor="form6Example2">Surnames</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-3">
                    <input type="text" id="phone" className="form-control" placeholder='Enter your username' onChange={()=>{handlePhone, handleForm}} defaultValue={user.phone}/>
                    <label className="form-label" htmlFor="form6Example3">Phone</label>
                </div>

                <div className="form-outline mb-3">
                    <input type="email" id="email" className="form-control" placeholder='Enter your username' maxLength="100" defaultValue={user.email} onChange={handleForm}/>
                    <label className="form-label" htmlFor="form6Example4">Email</label>
                </div>

                <div className="form-outline mb-3">
                    <input type="text" id="username" className="form-control" placeholder='Enter your username' maxLength="100" defaultValue={user.username} onChange={handleForm}/>
                    <label className="form-label" htmlFor="form6Example6">Username</label>
                </div>

                <div className="form-outline mb-3">
                    <input className="form-control" type="file" id="formFile" onChange={handlePhoto}/>
                    <label htmlFor="formFile" className="form-label">Photo</label>
                </div>

            </form>

        </>
    )
}
