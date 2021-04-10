import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
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

export const NotificationList = props => (
    <List filters={<NotificationFilter/>} {...props}>
        <Datagrid rowClick="show">
            <NumberField source="employee_id" />
            <TextField source="title" fullWidth />
            <TextField source="body" fullWidth />
        </Datagrid>
    </List>
);

const NotificationTitle = ({ record }) => {
    return <span>Notifcation  {record ? `${record.employee_id}` : ''}</span>;
};

export const NotificationShow = props => (    
    <Show  title={<NotificationTitle/>}{...props} > 
        <SimpleForm>
            <Typography variant="h6" gutterBottom>Notifcation</Typography>
            <NumberField source="employee_id" fullWidth/>
            <TextField source="title" fullWidth />
            <TextField source="body" fullWidth />
        </SimpleForm>
    </Show>
)