import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import { Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  const admin = user?.isAdmin ? true : false;
  const navigate = useNavigate();
  return (
    <>
      {admin &&
        <Layout>
          <Row gutter={20}>
            Dashboard
          </Row>
        </Layout>}
      {!admin &&
        <>
          <h6>Home page</h6>
          <Button onClick={() => {
            localStorage.clear()
            dispatch(setUser(null))
            navigate('/login')
          }}>Logout</Button>
        </>

      }
    </>
  )
}

export default Home