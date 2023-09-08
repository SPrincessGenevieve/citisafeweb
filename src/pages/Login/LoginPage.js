import React, { useState } from 'react';
import './login.css';
import InputS from './../../components/InputS'
import ConstButton from '../../components/ConstButton';
import TextBtn from '../../components/TextBtn';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from './authSlice';
import axios from '../plugins/axios'

function LoginPage({onClick}) {
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })


    const handleLogin = () => {

        axios.post("accounts/token/login", credentials).then((response) => {
            console.log(response.data)
        }).error((error) => {
            console.log(error.data)
        })


    }



    return (
        <div className='containerLogin'>
            <div>
                <h1>GEMS</h1>
            </div>
            <div>
                <InputS label="Username" width="100%" value={credentials.username} onChange={(text) => {
                    setCredentials({
                        ...credentials, username : text.target.value
                    })
                }}></InputS>

                <InputS label="Password" marginTop={4} width="100%" type="password" value={credentials.password} onChange={(text) => {
                    setCredentials({
                        ...credentials, password : text.target.value
                    })
                }}></InputS>
                
            </div>
            <div>
                <ConstButton onClick={handleLogin} marginTop={4} width="350px" height={48} title="SIGN IN" />
            </div>
            <div className='textBtnContainer'>
                <TextBtn title="Forgot Password?" />
            </div>
        </div>
    );
}

export default LoginPage;
