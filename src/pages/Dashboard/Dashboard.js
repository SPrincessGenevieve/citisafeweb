import React from 'react';
import './../Dashboard/styles.css'
import Navbar from './../../Navbar'
import ChartA from '../../components/ChartA';
import ChartC from '../../components/ChartC';
import ChartD from '../../components/ChartD';

function Dashboard(props) {
    return (
        <div className='DashboardContainer'>
            <Navbar className="nav"></Navbar>
            <div className='whiteContainer'>
                <div className='chartA'  style={{flexDirection:"row"}}>
                    <ChartA></ChartA>
                    <h1 style={{textAlign:"center", color:"#7D8ECC", fontSize: 20}}>Monthly Violation Breakdown</h1>
                    
                    <div className='chartContainer'>

                        <div className='chartD'>
                            <ChartD></ChartD>
                            <div className='titleD'>
                                <h1 style={{color:"#7D8ECC"}}>Weekly Violation Breakdown</h1>
                            </div>
                        </div>

                        <div className='chartC'>
                            <ChartC></ChartC>
                            <div className='titleC'>
                                <h1 style={{color:"#7D8ECC"}}>345</h1>
                            </div>
                            <div className='titleC2'>
                                <h1 style={{color:"#7D8ECC"}}>Daily Violation Breakdown</h1>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;