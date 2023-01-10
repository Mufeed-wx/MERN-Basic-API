import {React ,useEffect,useState}from 'react'
import '../index.css'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsReducer'
import jwt_decode from "jwt-decode"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user,setUser] = useState({})
  // const googleAuth = async () => {
  //   window.open(
  //     "http://localhost:5000/auth/google/callback",
  //     "_self"
  //   )
  // }
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    const userObject = jwt_decode(response.credential)
    console.log(userObject);
    setUser(userObject)
  }
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "43792379726-3rmrv5caka1t9jfpq2ua777op6mc75hn.apps.googleusercontent.com",
      callback:handleCallbackResponse
    })

    google.accounts.id.renderButton(  
      document.getElementById('signInDiv'),
      {theme:"outline",size:"large"}
    )
  },[])
  const onFinish = async (value) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/login', value);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        toast("Redirecting to home page")
        localStorage.setItem("token", response.data.data)
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('Somthing went wrong')
    }
  }
  return (
    <div className='authentication'>
      <div className="authentication-form card p-3">
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email' >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label='Password' name='password' >
            <Input placeholder='Password' type='password' />
          </Form.Item>
          <Button className='primary-button my-2' htmlType='submit'>Login</Button>
          <div id='signInDiv' style={{marginTop:10}}></div>
          <Link to='/register' className='anchor'>CLICK HERE TO REGISTER</Link>
          {/* <Button onClick={googleAuth}>google</Button> */}
       
        </Form>
      </div>

    </div>
  )
}

export default Login