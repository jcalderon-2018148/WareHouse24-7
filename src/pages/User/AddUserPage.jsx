import React from 'react'
import './styleUser.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

export const AddUserPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [form, setForm] = useState({
        names: '',
        surnames: '',
        phone: '',
        email: '',
        password: '',
        username: '',
        role: ''
    })
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
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

    const handlePhone = (e) => {
        const value = e.target.value;
        if (value.length <= 8) {
            setUsername(value);
        }
    }

    const add = async () => {
        try {
            const { data } = await axios.post('http://localhost:3022/user/addAccount', form, { headers: headers })
            if(photo) await axios.put(`http://localhost:3022/user/uploadImg/${data.user._id}`, photo, { headers: {'Authorization': localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'} })

            if(data.message) {
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })

                navigate('/dashboard/users')
            }

        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    return (

        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
                <h1 className="h2">Add User</h1>
            </div>

            <Link to={'/dashboard/users'}>
                <button type="submit" className="btn btn-danger m-2"> Cancel</button>
            </Link>
            <button type="submit" className="btn btn-success m-2 bi bi-plus-circle" onClick={()=>{add()}}> Create User</button>
            

            <form className='ps-5 ps-5 pt-4 me-5'>

                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleForm} type="text" id="form6Example1" className="form-control" placeholder='Enter your names' maxLength="25" name='names' />
                            <label className="form-label" htmlFor="form6Example1">Names</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleForm} type="text" id="form6Example2" className="form-control" placeholder='Enter your surnames' maxLength="25" name='surnames' />
                            <label className="form-label" htmlFor="form6Example2">Surnames</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-3">
                    <input type="number" className="form-control" placeholder='Enter your phone' onChange={(e) => { handlePhone(e); handleForm(e) }} name='phone' />
                    <label className="form-label" htmlFor="form6Example3">Phone</label>
                </div>

                <div className="form-outline mb-3">
                    <input onChange={handleForm} type="email" className="form-control" placeholder='Enter your email' maxLength="100" name='email' />
                    <label className="form-label" htmlFor="form6Example4">Email</label>
                </div>

                <div className="form-outline mb-3">
                    <input onChange={handleForm} type="password" className="form-control" placeholder='Enter your password' maxLength="100" name='password' />
                    <label className="form-label" htmlFor="form6Example5">Password</label>
                </div>

                <div className="form-outline mb-3">
                    <input onChange={handleForm} type="text" className="form-control" placeholder='Enter your username' maxLength="100" name='username' />
                    <label className="form-label" htmlFor="form6Example6">Username</label>
                </div>

                <div className="form-outline mb-3">
                    <input onChange={handleForm} type="text" className="form-control" placeholder='Enter your username' maxLength="100" name='role' />
                    <label className="form-label" htmlFor="form6Example6">Role</label>
                </div>

                <div className="form-outline mb-3">
                    <input onChange={handlePhoto} className="form-control" type="file" id="formFile" name='photo' />
                    <label htmlFor="formFile" className="form-label">Photo</label>
                </div>

            </form>

        </>

    )
}
