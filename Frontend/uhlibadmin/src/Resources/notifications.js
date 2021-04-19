import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show, DateField } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const NotificationFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by employee ID" source="ID" alwaysOn />
        {/* <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);

const ShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const NotificationList = props => (
    <List filters={<NotificationFilter/>} {...props}>
        <Datagrid rowClick="show">
            <NumberField source="employee_id" />
            <TextField source="title" fullWidth />
            <TextField source="body" fullWidth />
            <DateField source="created_at" fullWidth />
        </Datagrid>
    </List>
);

export const NotificationShow = props => (    
    <Edit actions={<ShowActions/>} {...props}> 
        <SimpleForm>
            <Typography variant="h6" gutterBottom>Notifcation</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
            Employee ID: <NumberField source="employee_id" fullWidth/>
            <Grid item xs={6}>
            Body: <TextField source="body" fullWidth />
            </Grid>
            </Grid>
            <Grid item xs={6}>
            Title: <TextField source="title" fullWidth />
            </Grid>
            <Grid item xs={6}>
            Date created: <DateField source="created_at" fullWidth />
            </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)