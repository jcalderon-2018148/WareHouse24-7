import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
