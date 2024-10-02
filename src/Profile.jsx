import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './REDUXTOOLKIT/Operation'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./home.css"
export const Profile = () => {
  const dispatch = useDispatch();
  ;
  const { loading, userInfo } = useSelector((s) => s.usersSlice)
  useEffect(() => {
    dispatch(getUser())
  }, [])
  return (
    <div className='container d-flex justify-content-center align-items-center  mt-5'>
      {loading ? (
        <div className='d-flex justify-content-center mt-5'>
          <span class="loader"></span>
        </div>
      ) : (
        <div className="row  5">
          <div className="col-12">
            <Card style={{ width: '100' }} className='shadow-lg p-3  bg-body-tertiary rounded'>
              <div className="d-flex justify-content-center my-2">
                <AccountCircleIcon sx={{ width: 80, height: 80 }} />
              </div>
              <Card.Body className="text-center container" >
                <div className='my-2 '>
                  <span className='fw-bold fs-3'>UserName : </span>
                  <span className=''> {userInfo.fname + " " + userInfo.lname}</span>
                </div>
                <div className='my-2'>
                  <span className='fw-bold fs-3'>Email : </span>
                  <span className=''> {userInfo.email}</span>
                </div>
                <div className='my-2'>
                  <span className='fw-bold fs-3'>BirthDay: </span>
                  <span className=''> {userInfo.birthday}</span>
                </div>
                <div className='my-2'>
                  <span className='fw-bold fs-3'>PhoneNumber: </span>
                  <span className=''> {userInfo.phonenumber}</span>
                </div>
                <div className='my-2'>
                  <span className='fw-bold fs-3'>Gender: </span>
                  <span className=''> {userInfo.gender}</span>
                </div>
                <div className='my-2'>
                  <span className='fw-bold fs-3'>Address: </span>
                  <span className=''> {userInfo.Address}</span>
                </div>


              </Card.Body>
            </Card>
          </div>
        </div>
      )}

    </div>
  )
}
