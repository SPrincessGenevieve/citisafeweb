import React from 'react';
import './login.css';
import InputS from './../../components/InputS'
import ConstButton from '../../components/ConstButton';
import TextBtn from '../../components/TextBtn';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from './authSlice';

function LoginPage({onClick}) {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(setLogin());

        console.log("what the fuck?")
    }
    return (
        <div className='containerLogin'>
            <div>
                <h1>GEMS</h1>
            </div>
            <div>
                <InputS label="Username" width="100%"></InputS>
                <InputS label="Password" marginTop={4} width="100%"></InputS>
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
