import * as React from "react";
import { defaultTheme } from "react-admin";
import { createMuiTheme } from '@material-ui/core/styles';
import { Admin, Resource, ListGuesser, EditGuesser  } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import TransformOutlinedIcon from '@material-ui/icons/TransformOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';

import Dashboard from './Dashboard';

import { UserList, UserCreate } from './users';
import { ItemList } from './items';
import { LibraryList } from './libraries';
// import { EmployeeList } from './employees';
import dataProvider from './dataProvider';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const customTheme = createMuiTheme({
    ...defaultTheme,
    ...{
      palette: {
        primary: {
          main: "#7edcff",
        },
        secondary: {
          main: "#8a1526",
        },
      }
    }
  });

const App = () => (
    <Admin theme={customTheme} dashboard={Dashboard} dataProvider={dataProvider}>
        {/* <Resource name="users" list={ListGuesser} /> */}
        <Resource name="notifications" list={ListGuesser} icon={NotificationsNoneOutlinedIcon} />
        <Resource name="users" list={UserList} create={UserCreate} icon={UserIcon} edit={EditGuesser}/>
        {/* <Resource name="items" list={ListGuesser} icon={PostIcon} edit={EditGuesser} /> */}
        <Resource name="items" list={ItemList} icon={PostIcon} edit={EditGuesser} />
        <Resource name="loans" list={ListGuesser} icon={TableChartOutlinedIcon} edit={EditGuesser} />
        <Resource name="libraries" list={LibraryList} icon={LocalLibraryIcon} edit={EditGuesser} />
        <Resource name="employees" list={ListGuesser} icon={SupervisorAccountIcon} edit={EditGuesser} />
        <Resource name="transactions" list={ListGuesser} icon={TransformOutlinedIcon} edit={EditGuesser} />
        <Resource name="paid Fines" list={ListGuesser} icon={AttachMoneyOutlinedIcon} edit={EditGuesser} />
        <Resource name="waiting List" list={ListGuesser} icon={CalendarViewDayOutlinedIcon} edit={EditGuesser} />

        

    </Admin>
    
);
export default App;