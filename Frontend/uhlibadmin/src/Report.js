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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
    const [pieData, setpiedata] = useState({});

    useEffect(() =>{
        fetchData(new Date('2021-03-18T21:11:54'), new Date());
    }, [])

    function fetchData(selectedDate,selectedDate2){
        console.log(selectedDate2.toISOString(), selectedDate2.toString());
        fetch(`https://uhlib.cc/api/reports/fetchusersdate?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => setNoOfUser(res));
        fetch('https://uhlib.cc/api/reports/fetchusersloans')
        .then( response => response.json() ).then(res => setNoOfLoans(res));
        fetch('https://uhlib.cc/api/reports/fetchpieitems')
        .then( response => response.json() ).then(res => setpiedata(res));
        //setpiedata(piedatArray)
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
                        <h1>Report  {selectedDate.toISOString()}</h1>
                        
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
        <Transaction_report/>
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



  // item 2 
  class Transaction_report extends React.Component {
    state = {
      data_rev:[] ,
      data_count:[],
      summary: {
        count:0,
        total:0
      }
    }
    componentDidMount(){ // defualt 
      console.log("amount the component")
      this.getData_rev("2021-04-01", "2021-04-30")
      this.getData_count("2021-04-01", "2021-04-30")
      this.getSummary("2021-04-01", "2021-04-30")
    }
    date_change (startdate, enddate){
      console.log("Date changed, updated the data")
      this.getData_rev(startdate, enddate)
      this.getData_count(startdate, enddate)
      this.getSummary(startdate, enddate)
    }
    getData_rev = async (startdate, enddate) =>{
      const url = `http://localhost:5000/api/reports/trans_rev/${startdate}/${enddate}`
      const res = await fetch(url)
      const json = await res.json()
      console.log("this is json", json)
      // update the state : data 
      this.setState({data_rev:json})
    }
    getData_count = async (startdate, enddate) =>{
      const url = `http://localhost:5000/api/reports/trans_count/${startdate}/${enddate}`
      const res = await fetch(url)
      const json = await res.json()
      console.log("this is json", json)
      this.setState({data_count:json})
    }
    getSummary = async (start, end)=>{
      const url = `http://localhost:5000/api/reports/trans_total/${start}/${end}`
      const res = await fetch(url)
      const json = await res.json()
      this.setState({summary:json})
    }
    render(){
      return (
        <div>
          <Date_start ondate_change={this.date_change.bind(this)}/>
          {/* <Date_end ondate_change={this.date_change}/> */}
          <Chart
            width={800}
            height={'300px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "count"],...this.state.data_count]
            }
            options={{
              title: 'TRANSACTION_COUNT',
              hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              chartArea: { width: '70%', height: '70%' },
            }}
          />
          <Chart
            width={800}
            height={300}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "count"],...this.state.data_count]
            }
            options={{
              title: 'count',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Total Population',
                minValue: 0,
              },
              vAxis: {
                title: 'City',
              },
            }}
            legendToggle
          />
          <Chart
            width={800}
            height={'300px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "Revenue"],...this.state.data_rev]
            }
            options={{
              title: 'REVENUES',
              hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: '70%', height: '70%' },
              // lineWidth: 25
            }}
          />
          <Chart
            width={800}
            height={300}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "count"],...this.state.data_rev]
            }
            options={{
              title: 'revuenues',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Total Population',
                minValue: 0,
              },
              vAxis: {
                title: 'City',
              },
            }}
            legendToggle
          />
        </div>
      )
    }
  }

  const Date_start = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const fetch_url = (date)=>{
     
      var sd = new Date(startDate);
      var year=sd.getFullYear();
      var month=sd.getMonth()+1 //getMonth is zero based;
      var day=sd.getDate();
      var sd=year+"-"+month+"-"+day;

      var ed = new Date(endDate);
      var year=ed.getFullYear();
      var month=ed.getMonth()+1 //getMonth is zero based;
      var day=ed.getDate();
      var ed=year+"-"+month+"-"+day;

      props.ondate_change(sd, ed)
    }
    return (
      <div>
        <DatePicker selected={startDate} 
            onChange={date => setStartDate(date)}
          	dateFormat='yyyy/MM/dd'
            onCalendarClose={fetch_url}
        />
        <DatePicker selected={endDate} 
          onChange={date => setEndDate(date)} 
          onCalendarClose={fetch_url}
        />
      </div>
    );
  };



   