import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const PaidFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="users_id" alwaysOn />
        {/* <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);

export const paidList = props => (
    <List filters={<PaidFilter/>} {...props}>
        <Datagrid rowClick="show">
            <NumberField source="users_id" />
            <NumberField source="item_id" />
            <TextField source="description" />
            <NumberField source="final_amount" />
            <NumberField source="is_paid" />
        </Datagrid>
    </List>
);

const FinesTitle = ({ record }) => {
    return <span>PaidFines {record ? `${record.last_name}` : ''}</span>;
};

export const FinesShow = (props) => (    
    <Show  title={<FinesTitle/>}{...props} >
        <SimpleForm>
        <NumberField source="users_id" />
            <NumberField source="item_id" />
            <TextField source="description" />
            <NumberField source="final_amount" />
            <BooleanInput source="is_paid" />
        </SimpleForm>
    </Show>
);