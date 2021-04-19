import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
// import { TabPanel } from '@material-ui/lab';
import {useState, useEffect} from 'react';
import Chart from "react-google-charts";
import Icon from "@material-ui/core/Icon";

import DatePicker from "react-datepicker"; //added by yoseline

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
    tabs: {

    },
    tab: {
        textcolor: 'green',
        color: 'white'
    }
  }));

export default function Report(){

    const [noOfUser, setNoOfUser] = useState({});
    const [noOfLoans, setNoOfLoans] = useState({});
    const [pieData, setpiedata] = useState(null);

const [noOfEmployees, setnoOfEmployees] = useState({});
const [avgAnnual, setavgAnnual] = useState({});
const [avgHourly, setavgHourly] = useState({});
const [BarData, setBardata] = useState({});
const [EpieData, setEpiedata] = useState({});

useEffect(() =>{
  EfetchData(new Date('2021-03-18T21:11:54'), new Date());
}, [])

    useEffect(() =>{
        fetchData(new Date('2021-03-18T21:11:54'), new Date());
    }, [])

    function fetchData(selectedDate,selectedDate2){
      if(selectedDate2 && selectedDate){
        console.log(selectedDate2.toISOString(), selectedDate2.toString());
        fetch(`https://uhlib.cc/api/reports/fetchusersdate?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => setNoOfUser(res));
        fetch(`https://uhlib.cc/api/reports/fetchusersloans?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => {
          console.log('no..', res);
          setNoOfLoans(res)
        });

        fetch(`https://uhlib.cc/api/reports/fetchpieitems?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => setpiedata(res));
      }        //setpiedata(piedatArray)
    }
    function EfetchData(selectedDate3,selectedDate4){
      fetch(`https://uhlib.cc/api/reports/fetchTotalEmp?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setnoOfEmployees(res));
      fetch(`https://uhlib.cc/api/reports/fetchAnnualAvg?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setavgAnnual(res));
      fetch(`https://uhlib.cc/api/reports/fetchHourlyAvg?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setavgHourly(res));
      fetch('https://uhlib.cc/api/reports/fetchBaritems')
      .then( response => response.json() ).then(res => setBardata(res));
      fetch(`https://uhlib.cc/api/reports/fetchEpieitems?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setEpiedata(res));
    }

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-03-18T21:11:54'));
    const [selectedDate2, setSelectedDate2] = React.useState(new Date());
    const [selectedDate3, setSelectedDate3] = React.useState(new Date('2021-03-18T21:11:54'));
    const [selectedDate4, setSelectedDate4] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchData(date);
      };

    const handleDateChange2 = (date) => {
        console.log('selected date',date.toString());
        setSelectedDate2(date);
        fetchData(selectedDate,date);
      };
    const handleDateChange3 = (date) => {
      setSelectedDate3(date);
      EfetchData(date, selectedDate4);
    };
    
    const handleDateChange4 = (date) => {
      setSelectedDate4(date);
      EfetchData(selectedDate3,date);
    };
    return <div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" />
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
                        <h3>Registered users: {noOfUser.count} </h3>
                        <h3>Number of loans: {noOfLoans.data}</h3>
                        <h3>Items breakdown </h3>
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
                                title: 'Items in libary',
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
        <Transaction_report/>
           
</TabPanel>
<TabPanel value={value} onChange={handleChange} index={2}>
        <Paper>
            Item Three
            <Grid item xs={12}>

                    <h3>Total number of employees: {noOfEmployees.data} </h3>
                
            </Grid>
            <Grid item xs={12}>
                        <h3>Average hourly rate: ${avgHourly.data} </h3>
                  
                </Grid>
            <Grid item xs={12}>
              
                    <h3>Average annual wage: ${avgAnnual.data} </h3>
             
            </Grid>
            <Grid item xs={12}>
     
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={BarData}
              options={{
                chart: {
                  title: 'Each Library Information',
                  subtitle: 'Showing employees and transactions of each library by it\'s ID',
                },
              }}
              rootProps={{ 'data-testid': '2' }}
            />
     
            </Grid>
            <Grid item xs={12}>
      
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={EpieData}
                            options={{
                                title: 'Type of Employees',
                                is3D: true
                            }}
                            rootProps={{ 'data-testid': '3' }}
                            />
        
                 
                </Grid>
                </Paper>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate3}
          onChange={handleDateChange3}
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
          value={selectedDate4}
          onChange={handleDateChange4}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>  
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
        },
        startDate: "2021-03-18T21:11:54", 
        endDate: "2021-04-18T21:11:54" 
      }
      componentDidMount(){ // defualt 
        console.log("amount the component")
        this.getData_rev(this.state.startDate, this.state.endDate)
        this.getData_count(this.state.startDate, this.state.endDate)
        this.getSummary(this.state.startDate, this.state.endDate)
      }
      date_change (startdate, enddate){
        console.log("Date changed, updated the data")
        this.getData_rev(startdate, enddate)
        this.getData_count(startdate, enddate)
        this.getSummary(startdate, enddate)
      }
      getData_rev = async (startdate, enddate) =>{
        const url = `https://uhlib.cc/api/reports/trans_rev/${startdate}/${enddate}`
        const res = await fetch(url)
        const json = await res.json()
        console.log("this is json", json)
        // update the state : data 
        this.setState({data_rev:json})
      }
      getData_count = async (startdate, enddate) =>{
        const url = `https://uhlib.cc/api/reports/trans_count/${startdate}/${enddate}`
        const res = await fetch(url)
        const json = await res.json()
        console.log("this is json", json)
        this.setState({data_count:json})
      }
      getSummary = async (start, end)=>{
        const url = `https://uhlib.cc/api/reports/trans_total/${start}/${end}`
        const res = await fetch(url)
        const json = await res.json()
        this.setState({summary:json})
      }
      fetch_url1 = (startDate)=>{ // for start date 
        this.setState({startDate: startDate})
        var sd = new Date(this.state.startDate);
        var year=sd.getFullYear();
        var month=sd.getMonth()+1 //getMonth is zero based;
        var day=sd.getDate();
        var sd=year+"-"+month+"-"+day;

        var ed = new Date(this.state.endDate);
        var year=ed.getFullYear();
        var month=ed.getMonth()+1 //getMonth is zero based;
        var day=ed.getDate();
        var ed=year+"-"+month+"-"+day;

        this.date_change(sd, ed)
      }
      fetch_url2 = (endDate)=>{ // for enddate 
        this.setState({endDate: endDate})
        var sd = new Date(this.state.startDate);
        var year=sd.getFullYear();
        var month=sd.getMonth()+1 //getMonth is zero based;
        var day=sd.getDate();
        var sd=year+"-"+month+"-"+day;

        var ed = new Date(this.state.endDate);
        var year=ed.getFullYear();
        var month=ed.getMonth()+1 //getMonth is zero based;
        var day=ed.getDate();
        var ed=year+"-"+month+"-"+day;

        this.date_change(sd, ed)
      }
      render(){
        return (
          
          <div class="ui center aligned basic segment">
            <div>
              <Date_start 
                fetch_url1={this.fetch_url1.bind(this)}
                fetch_url2={this.fetch_url2.bind(this)}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
              />
              <div class="ui placeholder segment">
                <div class="ui two column stackable center aligned grid">
                  <div class="ui vertical divider">And</div>
                  <div class="middle aligned row">
                    <div class="column">
                      <div class="ui icon header">
                        <i class="search icon"></i>
                        TOTAL TRANSACTIONS: {this.state.summary.count}
                      </div>
                      <div class="field">
                        <div class="ui search">
                          
                          <div class="results"></div>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="ui icon header">
                        <i class="dollar sign icon"></i>
                        TOTAL REVENUE : {this.state.summary.total.toFixed()}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div >
              <div class="ui two column centered grid" style={{margin:"20px"}}>
                <div></div>
                <Chart
                  width={500}
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
                  width={500}
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
                      title: 'Count',
                    },
                  }}
                  legendToggle
                />
                <Chart
                  width={500}
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
                  width={500}
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
                      title: 'Revenues',
                    },
                  }}
                  legendToggle
                />
                </div>
              </div>
          </div>
        )
      }
    }
  
    const Date_start = (props) => {
      
      const {startDate, endDate, fetch_url1, fetch_url2} = props
      
      return (
        <div >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={startDate}
            onChange={fetch_url1}
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
            value={endDate}
            onChange={fetch_url2}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>    
        </div>
      );
    };

