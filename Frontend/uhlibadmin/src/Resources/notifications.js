import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const notificationFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="ID" alwaysOn />
        {/* <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);

export const notificationList = props => (
    <List filters={<notificationFilter/>} {...props}>
        <Datagrid rowClick="show">
            <NumberField source="ID" />
            <NumberField source="employee_id" />
            <TextField source="title" fullWidth />
            <TextField source="body" fullWidth />
        </Datagrid>
    </List>
);