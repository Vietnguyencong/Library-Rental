import * as React from "react";
import { defaultTheme } from "react-admin";
import { createMuiTheme } from '@material-ui/core/styles';
import { Admin, Resource, Login, ListGuesser, EditGuesser  } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';

import PostIcon from '@material-ui/icons/Book';
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

import { UserList, UserCreate, UserEdit } from './Resources/users';
import { TransactionList, TransactionCreate, TransactionEdit,  TransactionShow } from './Resources/transactions';

import {LoanitemList, LoanitemCreate, LoanitemEdit, LoanitemShow} from './Resources/loanitem'
import { ItemList, ItemCreate } from './items';
import { LibraryList } from './libraries';
import { EmployeeList } from './employees';
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
        <Resource name="users" list={UserList} create={UserCreate} icon={UserIcon} edit={UserEdit}/> 

        <Resource name="transactions" list={TransactionList} create={TransactionCreate} edit={TransactionEdit} show={TransactionShow} icon={TransactionIcon} /> 

        <Resource name="loanitem" list={LoanitemList} edit={LoanitemEdit} create={LoanitemCreate} show={LoanitemShow} icon={AttachMoneyOutlinedIcon} /> 


         {/* <Resource name="users" list={ListGuesser} /> */}
        {/* <Resource name="notifications" list={ListGuesser} icon={NotificationsNoneOutlinedIcon} /> */}
        {/* <Resource name="items" list={ListGuesser} icon={PostIcon} edit={EditGuesser} /> */}
        {/* <Resource name="items" list={ItemList} create={ItemCreate} icon={PostIcon} edit={EditGuesser} />
        <Resource name="books" list={ItemList} icon={LibraryBooksIcon} edit={EditGuesser} />
        <Resource name="media" list={ItemList} icon={AlbumIcon} edit={EditGuesser} />
        <Resource name="printer" list={ItemList} icon={PrintIcon} edit={EditGuesser} /> */}

        {/* <Resource name="loans" list={ListGuesser} icon={TableChartOutlinedIcon} edit={EditGuesser} />
        <Resource name="libraries" list={LibraryList} icon={LocalLibraryIcon} edit={EditGuesser} />
        <Resource name="employees" list={EmployeeList} icon={SupervisorAccountIcon} edit={EditGuesser} />
        <Resource name="transactions" list={ListGuesser} icon={TransformOutlinedIcon} edit={EditGuesser} />
        <Resource name="paid Fines" list={ListGuesser} icon={AttachMoneyOutlinedIcon} edit={EditGuesser} />
        <Resource name="waiting List" list={ListGuesser} icon={CalendarViewDayOutlinedIcon} edit={EditGuesser} /> */}
        

    </Admin>
    
);
export default App;