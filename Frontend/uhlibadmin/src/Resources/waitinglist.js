import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const waitFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="user_id" alwaysOn />
        {/* <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);

export const waitList = props => (
    <List filters={<waitFilter/>} {...props}>
        <Datagrid rowClick="show">
            <NumberField source="user_id" />
            <NumberField source="item_id" />
        </Datagrid>
    </List>
);