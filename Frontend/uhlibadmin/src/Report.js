import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useState, useEffect} from 'react';
import Chart from "react-google-charts";

export default function Report(){

    const [noOfUser, setNoOfUser] = useState({});
    const [noOfLoans, setNoOfLoans] = useState({});
    const [pieData, setpiedata] = useState({});

    useEffect(() =>{
        fetchData();
    }, [])

    function fetchData(){
        fetch('http://localhost:5000/api/reports/fetchusers')
        .then( response => response.json() ).then(res => setNoOfUser(res));
        fetch('http://localhost:5000/api/reports/fetchusersloans')
        .then( response => response.json() ).then(res => setNoOfLoans(res));
        fetch('http://localhost:5000/api/reports/fetchpieitems')
        .then( response => response.json() ).then(res => setpiedata(res));
        //setpiedata(piedatArray)
    }

    return <div>
        <Grid container direction="row" justify="center" alignItems="center">
                <Grid item className="" xs={12}>
                    <Paper >
                        <h1>Report </h1>
                        
                    </Paper>
                </Grid>
                <Grid item className="" xs={12}>
                    <Paper >
                        <h3>Registered users {noOfUser.count} </h3>
                        
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper >
                    <p>Number of loans  {noOfLoans.data}</p>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <h3>Total revenue </h3>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                        <h3>Items loaned per library</h3>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={pieData}
                            options={{
                                title: 'Items loaned',
                                is3D: true
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </Paper>
                </Grid>


                        
        </Grid>








    </div>;
}