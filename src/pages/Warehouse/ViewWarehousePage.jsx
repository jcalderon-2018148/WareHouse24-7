import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const ViewWarehousePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [warehouse, setWarehouse] = useState({})
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getWarehouse = async () => {
        try {
            const { data } = await axios(`http://localhost:3022/warehouse/get/${id}`, { headers: headers })
            console.log(data);
            if (data.warehouse)
                setWarehouse(data.warehouse)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getWarehouse()
    }, [])

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">View Warehouse</h1>
                <Link to='/dashboard/warehouses'>
                    <button className='btn btn-success border border-dark me-5 '> Return </button>
                </Link>

            </div>
        </>
    )
}
