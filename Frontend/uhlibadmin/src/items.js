import * as React from "react";
import { Create, SimpleForm, List, Datagrid, TextField, NumberInput, EmailField, Filter, RadioButtonGroupInput, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
const ItemsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const ItemList = props => (
    <List filters={<ItemsFilter />} {...props}>

<Datagrid rowClick="edit">
            <TextField source="title" />
            
            <NumberField source="current_quantity" />
            <TextField source="title" />
            <NumberField source="stock" />
            <NumberField source="price" />
            <DateField source="created_by" />
            <DateField source="updated_by" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <NumberField source="rent_period" />
            <NumberField source="is_available" />
            <TextField source="item_type" />
            <TextField source="library_id" />
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
                    <NumberInput source="is_available" fullWidth />
                    <NumberInput source="rent_period" fullWidth />
                    <NumberInput source="stock" fullWidth />
                    <NumberInput source="library_id" fullWidth />
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);