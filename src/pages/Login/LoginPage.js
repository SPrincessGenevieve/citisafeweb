import React, { useState } from 'react';
import './login.css';
import InputS from './../../components/InputS'
import ConstButton from '../../components/ConstButton';
import TextBtn from '../../components/TextBtn';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin, setToken } from './authSlice';
import axios from '../plugins/axios'

function LoginPage({onClick}) {
    const dispatch = useDispatch();
    const navigation = useNavigate()

    const [credentials, setCredentials] = useState({
        username: "jaydemike15",
        password: "dario100"
    })


 const handleLogin = () => {
        axios.post("accounts/token/login", credentials).then(response => {
            console.log(response.data.auth_token);
            const token = response.data.auth_token;
            const user_role = response.data.role;

            dispatch(setToken(token));

            // Use the token to fetch user info
            axios.get("accounts/users/me/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            }).then(userResponse => {
                console.log("User Info:", userResponse.data);

                dispatch(setLogin(token))
                if (userResponse.data.role == "ADMIN"){

                    dispatch(setLogin())
                    // navigation("/dashboard")
                }


            }).catch(error => {
                alert("Failed to fetch user info");
                console.log(error);
            });
        }).catch(error => {
            alert("Something Wrong, Try again later");
            console.log(error);
        });

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
