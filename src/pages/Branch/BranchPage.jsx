import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import photo from '../../assets/property-1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../components/CardBranch'
import axios from 'axios'
import Swal from 'sweetalert2'

export const BranchPage = () => {
    const [branch, setBranch] = useState([{}])
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }
    const navigate = useNavigate()

    const del = async(id) => {
        try {
            Swal.fire({
                title: 'Are you sure to delete this branch?',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true,
            }).then(async(result)=>{
                if(result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3022/branch/delete/${id}`, {headers: headers}).catch(
                            (err)=>{
                                Swal.fire(err.response.data.message, '', 'error')
                            })
                    getBranches()
                    Swal.fire(`${data.message}`, '', 'success')
                } else {
                    Swal.fire('No worries!', '', 'success')
                }
            })
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    } 

    const getBranches = async() => {
        try {
            const { data } = await axios('http://localhost:3022/branch/get', {headers: headers})

            for(let i = 0; i < data.branches.length; i++){
                if(data.branches[i].photo){
                    let img = await axios(`http://localhost:3022/branch/getImg/${data.branches[i].photo}`, {headers: headers})
                    data.branches[i].photo = img.request.responseURL
                }continue
            }
            setBranch(data.branches)
            
        } catch (err) { 
            Swal.fire(err.response.data.message, '', 'error')
            console.log(err)
        }
    }

    useEffect(() => {
        getBranches()
    }, [])

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Branch</h1>
                <Link to='/dashboard/addBranch'>
                    <button className='btn btn-success border border-dark me-5 bi bi-plus-circle'> Add Branch</button>
                </Link>
                
            </div>

            <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex flex-wrap mb-3 mt-3'>
                {
                    branch.map((b, index) => {
                        return (
                            <Card 
                                key={index} 
                                name={b.name}
                                description={b.description}
                                address={b.address}
                                capitalGain={b.capitalGain}
                                state={b.state}
                                id={b._id}
                                photo={b.photo}
                                butDel={()=>del(b._id)}
                                butEdit={`/dashboard/updateBranch/${b._id}`}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}
