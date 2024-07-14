import {React, useEffect} from 'react'
import './branchPage.css'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateBranchPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [state, setState] = useState()
    const [branch, setBranch] = useState({})
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    const handlePhoto = (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        setPhoto(formData)
    }

    const handleButtons = (name)=>{
        if(name==='ACTIVE'){
            setState('ACTIVE')
        }else{
            setState('DISABLE')
        }
    }

    const getBranch = async()=>{
        try {
            const { data } = await axios(`http://localhost:3022/branch/get/${id}`, {headers: headers});
            setBranch(data.branch);
        } catch (err) {
            console.error(err);
        }
    }


    const update = async () => {
        try {
            let form={
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                address: document.getElementById('address').value,
                capitalGain: document.getElementById('capitalGain').value,
                state: state
            }
            const { data } = await axios.put(`http://localhost:3022/branch/update/${id}`, form, { headers: headers })
            if(photo)await axios.put(`http://localhost:3022/branch/uploadImg/${data.updateBranch._id}`, photo, { headers: {'Authorization': localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'} })

            if(data.message){
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                navigate('/dashboard/branches')
            }
            
            
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    useEffect(() => {
      {getBranch()}
    }, [])
    
    

    return (

        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
                <h1 className="h2">Update Branch</h1>
                <Link to={'/dashboard/branches'}>
                    <button type="submit" className="btn btn-warning border border-dark me-5 bi-arrow-clockwise" onClick={()=>{update()}}> Update Branch</button>
                </Link>
                {/* <button type="submit" className="btn btn-warning border border-dark btn-block mb-4">Update User</button> */}

            </div>



            <form className='ps-5 ps-5 pt-4 me-5'>

                <div className="form-outline mb-3">
                    <input  type="text" id='name' className="form-control" placeholder='Enter the name of the branch'  maxLength="100" defaultValue={branch.name} />
                    <label className="form-label" htmlFor="form6Example4">Name</label>
                </div>

                <div className="form-outline mb-3">
                    <input type="text" id='description' className="form-control" placeholder='About..'  maxLength="100"  defaultValue={branch.description} />
                    <label className="form-label" htmlFor="form6Example5">Description</label>
                </div>

                <div className="form-outline mb-3">
                    <input  type="address" id='address' className="form-control" placeholder='Enter the address'  maxLength="100" defaultValue={branch.address}/>
                    <label className="form-label" htmlFor="form6Example6">Address</label>
                </div>

                <div className="form-outline mb-3">
                    <input  type="number" id='capitalGain' className="form-control" placeholder='Enter the capital gain'  maxLength="100"  defaultValue={branch.capitalGain}/>
                    <label className="form-label" htmlFor="form6Example6">Capital Gain</label>
                </div>

                <div className="form-outline mb-3">
                    <div className='btn-group btn-group-toggle' data-toggle='buttons'>
                        <label className="btn btn-secondary active">
                            <input type="radio" onClick={()=>handleButtons('ACTIVE')} name="options" id="option1" autoComplete="off" /> Active
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio"onClick={()=>handleButtons('DISABLE')}  name="options" id="option2" autoComplete="off"/> Disable
                        </label>
                    </div>
                    <br />
                    <label className="form-label" htmlFor="form6Example6">Status</label>
                </div>

                <div className="form-outline mb-3">
                    <input onChange={handlePhoto} className="form-control" type="file" id="formFile" name='photo' />
                    <label htmlFor="formFile" className="form-label">Photo</label>
                </div>

            </form>

        </>

    )
}
