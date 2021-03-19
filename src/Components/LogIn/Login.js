import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { app } from "../Firebase/Base"
import TextArea from 'antd/lib/input/TextArea';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd'
import './Login.css'

const db = app.firestore().collection("AuthUser")
function Login() {
  const hist = useHistory()
  // const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [image1, setImage1] = useState(null)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [hasAccount, setHasAccount] = useState(false)


  const clearInput = () => {
    setEmail("")
    setPassword("")
  }

  const clearErrors = () => {
    setEmailError("")
    setPasswordError("")
  }

  const SignUP = async () => {
    clearErrors()
    const newUser = await app.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    })
    if (newUser) {
      await db.doc(newUser.user.uid).collection('HouseOner').doc().set({
        name,
        email,
        password,
        Photo: await image1,
        bio
      })
      alert("Welcome")
      hist.push("/")
    }
  }

  const SignIN = async () => {
    clearErrors()
    const User = await app.auth().signInWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    })

    if (User) {
      alert("Welcome")
      hist.push("/")
      window.location.reload(true)
    }
  }

  const ImageUrl = async (e) => {
    const file = e.target.files[0]
    const store = app.storage().ref()
    const Child = store.child(file.name)
    await Child.put(file)
    setImage1(await Child.getDownloadURL())
  }


  // const Show = () => {
  //   setOpen(!open)
  // }


  return (

    <div>
      <div>
        <div className='GeneralLoginDiv'>
          <div className='SubGeneralLoginDiv'>
            <div className='ContentHold'>
              <div>
                {hasAccount ? (
                  <>
                    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>



                      <div style={{ color: '#ddd' }}>Upload Image</div>
                      <Input
                        className='InputDiv'
                        type='file'
                        autoFocus
                        required
                        onChange={ImageUrl}
                      />


                      <div style={{ color: '#ddd' }}>Name</div>
                      <Input
                        className='InputDiv'
                        placeholder='Name'
                        type='name'
                        autoFocus
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div style={{ color: '#ddd' }}>Email</div>
                      <Input
                        className='InputDiv'
                        placeholder='Email'
                        type='email'
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p style={{ color: 'red', fontSize: '11px' }}> {emailError} </p>
                      <div style={{ color: '#ddd' }}>Password</div>
                      <Input
                        className='InputDiv'
                        placeholder='Password'
                        type='password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <div style={{ color: '#ddd' }}>Short Bio</div>
                      <TextArea
                        className='InputDiv'
                        placeholder='Short Bio'
                        type='text'
                        value={bio}
                        required
                        onChange={(e) => setBio(e.target.value)}
                      />


                      <p style={{ color: 'red', fontSize: '11px' }}> {passwordError} </p>
                      <Button onClick={SignUP} style={{ color: '#fff', fontWeight: 'bold', backgroundColor: '#4081ec', marginTop: '10px' }}>Sign Up</Button>
                      <p style={{ color: '#ddd' }}>Have An Account ? <span onClick={() => setHasAccount(!hasAccount)} style={{ color: 'yellow', cursor: 'pointer' }}>Sign In</span></p>

                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ color: '#ddd' }}>UserName</div>
                      <Input
                        className='InputDiv'
                        placeholder='Email'
                        type='email'
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p style={{ color: 'red', fontSize: '11px' }}> {emailError} </p>
                      <div style={{ color: '#ddd' }}>Password</div>
                      <Input
                        className='InputDiv'
                        placeholder='Password'
                        type='password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p style={{ color: 'red', fontSize: '11px' }}> {passwordError} </p>
                      <Button onClick={SignIN} style={{ color: '#fff', fontWeight: 'bold', backgroundColor: '#4081ec', marginTop: '10px' }}>Sign In</Button>
                      <p style={{ color: '#ddd' }}>Don't Have An Account ? <span onClick={() => setHasAccount(!hasAccount)} style={{ color: 'lightGreen', cursor: 'pointer' }} >Sign Up</span></p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login