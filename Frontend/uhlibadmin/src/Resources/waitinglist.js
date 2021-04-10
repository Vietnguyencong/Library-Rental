import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const WaitFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="user_id" alwaysOn />
        {/* <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);

export const WaitList = props => (
    <List filters={<WaitFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="user_id" />
            <NumberField source="item_id" />
        </Datagrid>
    </List>
);


export const WaitCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New waitlist item</Typography>
                    <NumberInput source="user_id" />
                    <NumberInput source="item_id" />
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);



export const WaitEdit = (props) =>(
     <Edit {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Edit waitlist item</Typography>
                    <NumberInput source="user_id" />
                    <NumberInput source="item_id" />
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


const WaitTitle = ({ record }) => {
    return <span>Waitlist item {record ? `${record.id}` : ''}</span>;
};

export const WaitShow = (props) => (    
    <Show  title={<WaitTitle/>}{...props} >
        <SimpleForm>
            <NumberField source="user_id" />
            <NumberField source="item_id" />
        </SimpleForm>
    </Show>
);