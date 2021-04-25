import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show, DateField } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const ShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const StocksList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="title" fullWidth />
            <NumberField source="count" />
        </Datagrid>
    </List>
);

export const StocksShow = props => (    
    <Edit actions={<ShowActions/>} {...props}> 
        <SimpleForm>
            <Typography variant="h6" gutterBottom>Notifcation</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                Title: <TextField source="id" fullWidth />
                </Grid>
                <Grid item xs={6}>
                Stock: <NumberField source="count" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)