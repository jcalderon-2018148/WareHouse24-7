import React, { useEffect, useState, createContext } from 'react'
import { createBrowserRouter, RouterProvider, Navigate, BrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/HomePage/HomePage'
import { Dashboard } from './pages/DashboardPage/Dashboard'
import { AddUserPage } from './pages/User/AddUserPage'
import { UserPage } from './pages/User/UserPage'
import { UpdateUserPage } from './pages/User/UpdateUserPage'
import { AboutUsPage } from './pages/HomePage/AboutUsPage'
import { LoginPage } from './pages/HomePage/LoginPage'
import { NotFound } from './pages/NotFound/NotFound'
import { WarehousePage } from './pages/Warehouse/WarehousePage'
import { ServicePage } from './pages/Service/ServicePage'
import { AddServicePage } from './pages/Service/AddServicePage'
import { UpdateServicePage } from './pages/Service/UpdateServicePage'
import { BranchPage } from './pages/Branch/BranchPage'
import { AddBranchPage } from './pages/Branch/AddBranch'
import { UpdateBranchPage } from './pages/Branch/Updatebranch'
import { AddWarehousePage } from './pages/Warehouse/AddWarehousePage'
import { ViewWarehousePage } from './pages/Warehouse/ViewWarehousePage'
import { AssignWarehousePage } from './pages/Warehouse/AssignWarehousePage'
import { UpdateWarehousePage } from './pages/Warehouse/UpdateWarehousePage'

export const AuthContext = createContext()

export const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState({
        names: '',
        username: '',
        role: ''
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])


    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/about',
                    element: <AboutUsPage />
                },
                {
                    path: '/login',
                    element: <LoginPage />
                },
                {
                    path: '/dashboard',
                    element: loggedIn ? <Dashboard /> : <LoginPage />,
                    children: [
                        {
                            path: 'users',
                            element: <UserPage />
                        },
                        {
                            path: 'addWarehouse',
                            element: <AddWarehousePage />
                        },
                        {
                            path: 'viewWarehouse/:id',
                            element: <ViewWarehousePage />
                        },
                        {
                            path: 'assign-user-warehouse/:id',
                            element: <AssignWarehousePage />
                        },
                        {
                            path: 'update/:id',
                            element: <UpdateWarehousePage/>
                        },
                        {
                            path: 'addUser',
                            element: <AddUserPage />
                        },
                        {
                            path: 'warehouses',
                            element: <WarehousePage />
                        },
                        {
                            path: 'services',
                            element: <ServicePage />
                        },
                        {
                            path: 'addService',
                            element: <AddServicePage />
                        },
                        {
                            path: 'updateService/:id',
                            element: <UpdateServicePage />
                        }, {
                            path: 'updateUser/:id',
                            element: <UpdateUserPage />
                        }, {
                            path: 'branches',
                            element: <BranchPage />
                        }, {
                            path: 'addBranch',
                            element: <AddBranchPage />
                        }, {
                            path: 'updateBranch/:id',
                            element: <UpdateBranchPage />
                        }
                    ]
                }
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}
