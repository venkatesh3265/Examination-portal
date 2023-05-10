import React from 'react'
import Wrapper from '../../assets/wrapper/SharedLayout'
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from '../../components'


const SharedLayout = () => {
  return (
    <Wrapper>
            <main className="dashboard">
          
                <Sidebar/>
                <div>
                    <Navbar/>
                    <div className="dashboard-page">
                    <Outlet />
                    </div>
                </div>
            </main>

        </Wrapper>
  )
}

export default SharedLayout