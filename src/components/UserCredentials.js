import React from 'react';
import InputS from './InputS';
import { Button } from '@mui/material';
import { ArrowBack, CloseOutlined } from '@mui/icons-material';
import ConstButton from './ConstButton';

function UserCredentials({back, create, close}) {
    return (
        <>
            <div style={{flexDirection:"row", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
                <Button style={{position:"absolute", right: 0, marginRight: 40}} onClick={close}>
                    <CloseOutlined style={{}}></CloseOutlined>
                </Button>
                <Button style={{position:"absolute", left: 0, marginRight: 40}} onClick={back}>
                    <ArrowBack style={{}}></ArrowBack>
                </Button>
            </div>
            <h1 style={{marginTop: 50, textAlign:"center"}}>User Information</h1>
            <div style={{height:"80%", marginTop: 60}}>
                <div style={{width: "100%", flexDirection:"column", display:"flex", alignItems:"center"}}>
                    <div style={{display:"flex"}}>
                        <InputS required label="Username"></InputS>
                    </div>
                    <div style={{marginTop: 40, display:"flex"}}>
                        <InputS required type={"password"} label="Password"></InputS>
                    </div>
                    <div style={{marginTop: 40, display:"flex"}}>
                        <InputS required  type={"password"} label="Confirm Password"></InputS>
                    </div>
                </div>
            </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop: -200}}>
                <div style={{width: "20%"}}>
                    <ConstButton title={"CREATE USER"} height={50} onClick={create}></ConstButton>
                </div>
            </div>
        </>
    );
}

export default UserCredentials;