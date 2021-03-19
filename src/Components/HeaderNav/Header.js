import React, { useContext, useState, useEffect } from 'react'
import './HeaderNav.css'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import { GlobalValue } from '../GlobalApp/Globalapp'
import { app } from "../Firebase/Base"
import { Link, useHistory } from "react-router-dom"
import Logo from '../Image/estLogoC.png'


function Header() {
  const hist = useHistory()
  const { current } = useContext(GlobalValue)
  const [open, setOpen] = useState(false)

  const Check = () => {
    setOpen(!open)
  }

  const SignOut = async () => {
    await app.auth().signOut()
    window.location.reload(true)
    hist.push("/")
  }

  return (
    <div className='MainHeaderDiv'>
      <div className='SubHeaderdiv'>

        <Link style={{
          cursor: "pointer"
        }} to="/">

          <img src={Logo} alt='' className='LogoDiv' />
        </Link>
        {
          current ? <Button onClick={() => {
            SignOut();
          }}>Signout</Button> :
            <Button onClick={() => {
              hist.push("/signIn")
            }}>Become an Agent </Button>
        }
      </div>
    </div>
  )
}

export default Header