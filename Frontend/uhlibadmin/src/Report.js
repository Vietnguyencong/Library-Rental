import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
// import { TabPanel } from '@material-ui/lab';
import {useState, useEffect} from 'react';
import Chart from "react-google-charts";

import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    tabs:{

    },
    tab:{
        textcolor: 'green',
        color: 'purple'
    }
  }));

export default function Report(){

    const [noOfUser, setNoOfUser] = useState({});
    const [noOfLoans, setNoOfLoans] = useState({});
    const [pieData, setpiedata] = useState(null);

    useEffect(() =>{
        fetchData(new Date('2021-03-18T21:11:54'), new Date());
    }, [])

    function fetchData(selectedDate,selectedDate2){
      if(selectedDate2 && selectedDate){
        console.log(selectedDate2.toISOString(), selectedDate2.toString());
        fetch(`http://localhost:5000/api/reports/fetchusersdate?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => setNoOfUser(res));
        fetch(`http://localhost:5000/api/reports/fetchusersloans?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => {
          console.log('no..', res);
          setNoOfLoans(res)
        });

        fetch(`http://localhost:5000/api/reports/fetchpieitems?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => setpiedata(res));
      }        //setpiedata(piedatArray)
    }

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-03-18T21:11:54'));
    const [selectedDate2, setSelectedDate2] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchData(date);
      };

    const handleDateChange2 = (date) => {
        console.log('selected date',date.toString());
        setSelectedDate2(date);
        fetchData(selectedDate,date);
      };

    return <div>

{/* https://material-ui.com/components/tabs/ */}
        <AppBar position="static">
            <Tabs value={"1"} onChange={handleChange} aria-label="simple tabs example" centered>
                <Tab label="Item One" {...a11yProps(0)} className={classes.tab}/>
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} onChange={handleChange} index={0}>
            Item One


            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item className="" xs={12}>
                    <Paper >
                        <h1>Report  { moment(selectedDate).format("yyyy-MM-DD")} to { moment(selectedDate2).format("yyyy-MM-DD")}</h1>
                        
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
                        <h3>Items per library</h3>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Paper style={{ height: "290px", margin: '4px', padding: '6px'}}>
                    {/* { pieData && pieData.map(item => { return <p>{JSON.stringify(item)}</p>                      })} */}
                      { pieData && pieData.map(item => { return <p>{`${item[0]} : ${item[1]}`}</p>                      })}
                      {/* {pieData !=null && pieData.map(item => { return<p>{`${item[0]} ${item[1]} `}</p>                     })} */}
                    </Paper>
                </Grid>


                        
        </Grid>


 {/* Date picker  */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        </MuiPickersUtilsProvider>
 


 
<MuiPickersUtilsProvider utils={DateFnsUtils}>

<KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate2}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>    

    {/* Date picker  */}

</TabPanel>
        <TabPanel value={value} onChange={handleChange} index={1}>
            Item Two
</TabPanel>
        <TabPanel value={value} onChange={handleChange} index={2}>
            Item Three
</TabPanel>




 
 









    </div>;
}

function TabONE(){return <p>TAB ONE</p>}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }