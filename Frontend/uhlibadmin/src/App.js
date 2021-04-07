import * as React from "react";
import { defaultTheme, ShowGuesser } from "react-admin";
import { createMuiTheme } from '@material-ui/core/styles';
import { Admin, Resource, Login, ListGuesser, EditGuesser  } from 'react-admin';
import authProvider from './authProvider';

import UserIcon from '@material-ui/icons/Group';
import TransactionIcon from '@material-ui/icons/AccountBalance';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import TransformOutlinedIcon from '@material-ui/icons/TransformOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AlbumIcon from '@material-ui/icons/Album';
import PrintIcon from '@material-ui/icons/Print';

import Dashboard from './Dashboard';

import { UserList, UserCreate, UserEdit, UserShow } from './Resources/users';
import { TransactionList, TransactionCreate, TransactionEdit,  TransactionShow } from './Resources/transactions';

import {LoanitemList, LoanitemCreate, LoanitemEdit, LoanitemShow} from './Resources/loanitem'
import { ItemList, ItemCreate, ItemEdit } from './Resources/items';
import { LibraryList } from './libraries';
import { EmployeeList } from './employees';
import { paidList/*, FinesShow*/ } from './Resources/paidfines';
import { waitList } from './Resources/waitinglist';
import { notificationList } from './Resources/notifications';



// import dataProvider from './dataProvider';
import superDataprovider from './superDataprovider'

const LoginPage = () => (
    <Login
        backgroundImage="https://images.unsplash.com/photo-1569407228235-9a744831a150?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
    />
);

const customTheme = createMuiTheme({
    ...defaultTheme,
    ...{
        palette: {
            primary: {
                main: "#bd1351",
            },
            secondary: {
                main: "#8a1526",
            },
        }
    }
});

const App = () => (
    <Admin theme={customTheme} loginPage={LoginPage} authProvider={authProvider} dashboard={Dashboard} dataProvider={superDataprovider}>
        <Resource name="users" list={UserList} show={UserShow}create={UserCreate}  edit={UserEdit} icon={UserIcon}/> 
        
        <Resource name="notifications" list={notificationList}  icon={NotificationsNoneOutlinedIcon} /> 

        <Resource name="items" list={ItemList} create={ItemCreate} edit={ItemEdit} icon={LibraryBooksIcon} /> 
        
        { /* <Resource name="books" list={ItemList} icon={LibraryBooksIcon} edit={EditGuesser} />*/}

        { /* <Resource name="media" list={ItemList} icon={AlbumIcon} edit={EditGuesser} />*/}

        { /* <Resource name="printer" list={ItemList} icon={PrintIcon} edit={EditGuesser} /> */}

        <Resource name="loanitem" list={LoanitemList} edit={LoanitemEdit} create={LoanitemCreate} show={LoanitemShow} icon={TableChartOutlinedIcon} /> 
        
        <Resource name="libraries" list={LibraryList} icon={LocalLibraryIcon} edit={EditGuesser} />

        {/*<Resource name="employees" list={EmployeeList} icon={SupervisorAccountIcon} edit={EditGuesser} /> */}

        <Resource name="transactions" list={TransactionList} create={TransactionCreate} edit={TransactionEdit} show={TransactionShow} icon={TransformOutlinedIcon} /> 

        {<Resource name="paidfines" list={paidList} /*show={FinesShow}*/ icon={AttachMoneyOutlinedIcon} edit={EditGuesser} />}
        
        {<Resource name="waitinglist" list={waitList} /*show={FinesShow}*/ icon={CalendarViewDayOutlinedIcon} edit={EditGuesser} />}
        

    </Admin>
    
);
export default App;