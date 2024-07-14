import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const AssignWarehousePage = () => {
    const [services, setServices] = useState([{}])
    const [clients, setClients] = useState([{}])
    const [service, setService] = useState([])
    const [img, setImg] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const [form, setForm] = useState({
        lessee: '',
        additionalService: []
    })
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeServices = (e) => {
        let data = {
            service: e.target.value
        }
        setService([...service, data])
    }

    const getServices = async () => {
        try {
            const { data } = await axios('http://localhost:3022/service/get', { headers: headers })
            setServices(data.services);
        } catch (err) {
            console.error(err);
        }
    }

    const getClients = async () => {
        try {
            const { data } = await axios('http://localhost:3022/warehouse/get-clients', { headers: headers })
            setClients(data.clients)
        } catch (err) {
            console.error(err);
        }
    }

    const assign = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.put(`http://localhost:3022/warehouse/assign/${id}`, form, { headers: headers })
            if (data.message) {
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })

                navigate('/dashboard/warehouses')
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getServices()
        getClients()
        setForm({
            ...form,
            additionalService: service
        })
    }, [service])

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
                <h1 className="h2">Assign Lesse Warehouse</h1>
            </div>

            <Link to={'/dashboard/warehouses.0'}>
                <button type="submit" className="btn btn-danger m-2"> Cancel</button>
            </Link>
            <button className="btn btn-success m-2 bi bi-plus-circle" onClick={(e) => assign(e)} > Assing Lesse</button>


            <form className='ps-5 ps-5 pt-4 me-5'>

                <div className="form-outline mb-3">
                    <select className="form-select select-input" name='lessee' onChange={handleChange}>
                        <option value={null}>Select client</option>
                        {
                            clients.map(({ _id, names, surnames }, index) => {
                                return (
                                    <option key={index} value={_id}>{`${names} ${surnames}`}</option>
                                )
                            })
                        }
                    </select>
                    <label className="form-label" htmlFor="form6Example3">Lessee</label>
                </div>

                <div className="form-outline mb-3">
                    <select className="form-select select-input" name='services' onChange={handleChangeServices}>
                        <option value={null}>Select services</option>
                        {
                            services.map(({ _id, name, price }, index) => {
                                return (
                                    <option key={index} value={_id}>{`${name}   |   Q.${Number(price).toFixed(2)}`}</option>
                                )
                            })
                        }
                    </select>
                    <label className="form-label" htmlFor="form6Example5">Services</label>
                </div>

            </form>

        </>
    )
}
