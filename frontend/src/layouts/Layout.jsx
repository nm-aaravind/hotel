import React, { useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import ModalWrapper from '../components/ModalWrapper'
import SignUpForm from '../components/forms/SignUpForm'
import SignInForm from '../components/forms/SignInForm'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {

  const [modalVisible, setModalVisible] = useState(false);

  function toggleModalVisible(type){
    setModalVisible(type)
  }

  return (
    <div className='flex flex-col min-h-screen bg-cloud'>
        <Header toggleModalVisible={toggleModalVisible}/>
        <Outlet context={[toggleModalVisible]}/>
        <ModalWrapper modalVisible={modalVisible} toggleModalVisible={toggleModalVisible}>
          {
            modalVisible === 'signin' ? <SignInForm /> : <SignUpForm />
          }
        </ModalWrapper>
        <ToastContainer position='bottom-center' hideProgressBar={true} draggable autoClose={2000} limit={1}  transition={Flip} toastStyle={{ fontFamily: 'Raleway', fontSize:'1.2rem'}}/>
        {/* <Footer /> */}
    </div>
  )
}

export default Layout