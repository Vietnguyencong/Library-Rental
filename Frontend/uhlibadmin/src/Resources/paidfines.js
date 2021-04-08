import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const PaidFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="users_id" alwaysOn />
        { <ReferenceInput label="User ID" source="users_id" reference="paidfines" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> }
    </Filter>
);

export const PaidList = props => (
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


export const FinesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Fine</Typography>
                    <NumberField source="users_id" fullWidth/>
                    <NumberField source="item_id" fullWidth/>
                    <TextField source="description" fullWidth/>
                    <NumberField source="final_amount" fullWidth/>
                    <NumberField source="is_paid" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);



export const FinesEdit = (props) =>(
     <Edit {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Edit Fine</Typography>
                    <NumberField source="users_id" fullWidth/>
                    <NumberField source="item_id" fullWidth/>
                    <TextField source="description" fullWidth/>
                    <NumberField source="final_amount" fullWidth/>
                    <NumberField source="is_paid" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


const FinesTitle = ({ record }) => {
    return <span>PaidFines {record ? `${record.id}` : ''}</span>;
};

export const FinesShow = (props) => (    
    <Show  title={<FinesTitle/>}{...props} >
        <SimpleForm>
        <NumberField source="id" />
            <NumberField source="item_id" />
            <TextField source="description" />
            <NumberField source="final_amount" />
            <NumberField source="is_paid" />
        </SimpleForm>
    </Show>
);