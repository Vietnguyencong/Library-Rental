import * as React from "react";
import { Show, Edit, Create, SimpleForm, List, Datagrid, TextField, NumberInput, EmailField, Filter, RadioButtonGroupInput, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
import {Actions, MyBooleanfield} from './helper'
const ItemsFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search by title" source="item_type" alwaysOn /> */}
        <RadioButtonGroupInput source="item_type" choices={[
            { id: "", name:"All"},
            { id: 'Book', name: 'Book' },
            { id: 'Media', name: 'Media' },
            { id: 'Printer', name: 'Printer' }
        ]} alwaysOn/> 
        <TextInput source="title" alwaysOn/>

        {/* <ReferenceInput label="Library" source="library_id" reference="libraries" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);


export const ItemList = props => (
    <List filters={<ItemsFilter />} {...props}>

<Datagrid rowClick="edit">
            <TextField source="title" />
            <NumberField source="current_quantity" />
            <NumberField source="stock" />
            <NumberField source="price" />
            <NumberField source="rent_period" />
            <NumberField source="is_available" />
            <TextField source="item_type" />
            <TextField source="library_id" />
            <DateField source="created_by" />
            <DateField source="updated_by" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            {/* <ReferenceField source="library_id" reference="libraries"><TextField source="id" /></ReferenceField> */}
            <TextField source="id" />
        </Datagrid>
    </List>
);

export const ItemCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Library Item</Typography>
                    <TextInput source="title" fullWidth />
                    <RadioButtonGroupInput source="item_type" choices={[
                    { id: 'Book', name: 'Book' },
                    { id: 'Media', name: 'Media' },
                    { id: 'Printer', name: 'Printer' },
                    ]} />    
                    <NumberInput source="price" fullWidth />
                    <NumberInput source="current_quantity" default="1" fullWidth />    
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <BooleanInput source="is_available" fullWidth />
                    <NumberInput source="rent_period" fullWidth />
                    <NumberInput source="stock" fullWidth />
                    <NumberInput source="library_id" fullWidth />
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);

export const ItemEdit = (props) =>(
    <Edit actions={<Actions/>} {...props}>
    <SimpleForm>
           <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Library Item</Typography>
                    <TextInput source="title" fullWidth />
                    <RadioButtonGroupInput source="item_type" choices={[
                    { id: 'Book', name: 'Book' },
                    { id: 'Media', name: 'Media' },
                    { id: 'Printer', name: 'Printer' },
                    ]} />    
                    <NumberInput source="price" fullWidth />
                    <NumberInput source="current_quantity" default="1" fullWidth />    
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <BooleanInput source="is_available" fullWidth />
                    <NumberInput source="rent_period" fullWidth />
                    <NumberInput source="stock" fullWidth />
                    <NumberInput source="library_id" fullWidth />
                </Grid>
           </Grid>
       </SimpleForm>
   </Edit>
)


export const ItemShow = (props) =>(
    <Show  {...props}>
       <SimpleForm>
           <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Item Information</Typography>
                    <Typography variant="subtitle2" gutterBottom >
                        Title: <TextField source="title" fullWidth />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Item_type: <TextField source="item_type" fullWidth />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Price: <NumberField source="price" fullWidth />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Total quantity: <NumberField source="current_quantity" default="1" fullWidth />    
                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        is_available: <MyBooleanfield source="is_available" fullWidth />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                    Rent_period:<NumberField source="rent_period" fullWidth />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                    Stock: <NumberField source="stock" fullWidth />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                    Library_id: <NumberField source="library_id" fullWidth />
                    </Typography>


                </Grid>
           </Grid>
       </SimpleForm>
   </Show>
)
