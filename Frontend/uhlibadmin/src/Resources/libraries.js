import * as React from "react";
import { Show, Edit, Create, SimpleForm, List, Datagrid, TextField, EmailField, Filter, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
const LibrariesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Libaries" source="Name" reference="libraries" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const LibraryList = props => (
    <List filters={<LibrariesFilter />} {...props}>

    <Datagrid rowClick="edit">
            
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="opening_hours" />
            <TextField source="location" />
            
        </Datagrid>
    </List>
);
export const LibraryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Library</Typography>
                    <TextInput source="name" fullWidth />  
                    <TextInput source="opening_hours" fullWidth />
                    <TextInput source="location" fullWidth />    
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);

export const LibraryEdit = (props) =>(
    <Edit {...props}>
       <SimpleForm>
           <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Library</Typography>
                    <TextInput source="name" fullWidth />  
                    <TextInput source="opening_hours" fullWidth />
                    <TextInput source="location" fullWidth />    
                </Grid>
           </Grid>
       </SimpleForm>
   </Edit>
);

export const LibraryShow = (props) => (    
    <Show {...props} >
        <SimpleForm>
            <Typography variant="h6" gutterBottom>Library</Typography>
            <TextInput source="name" fullWidth />  
            <TextInput source="opening_hours" fullWidth />
            <TextInput source="location" fullWidth />   
        </SimpleForm>
    </Show>
);