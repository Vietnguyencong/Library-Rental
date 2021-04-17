import * as React from "react";
import { ListButton, TopToolbar, ShowButton, ReferenceManyField, TabbedShowLayout, Tab, Show, Edit, Create, SimpleForm, List, Datagrid, TextField, EmailField, Filter, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
const LibrariesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
        {/*<ReferenceInput label="Libaries" source="Name" reference="libraries" allowEmpty>
            <SelectInput optionText="name" />
</ReferenceInput>*/}
    </Filter>
);


const EditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

const ShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const LibraryList = props => (
    <List filters={<LibrariesFilter />} {...props}>

        <Datagrid rowClick="show">
            
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
    <Edit actions={<EditActions/>}{...props}>
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
    <Show actions={<ShowActions/>} {...props} >
        <TabbedShowLayout syncWithLocation={false}>
            <Tab label="Summary">
                <Typography variant="h6" gutterBottom>Library</Typography>
                <TextField source="name" fullWidth />  
                <TextField source="opening_hours" fullWidth />
                <TextField source="location" fullWidth />   
            </Tab>
            <Tab label="Items">
                <ReferenceManyField label="Items" reference="items" target="library_id">
                    <Datagrid>
                        {/*<ReferenceField source="title" reference="items">
                            <TextField source="title"/>
</ReferenceField>*/}
                        <TextField source="title" />
                        <NumberField source="current_quantity" />
                        <NumberField source="stock" />
                        <NumberField source="price" />
                        <NumberField source="rent_period" />
                        <NumberField source="is_available" />
                        <TextField source="item_type" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Employees">
                <ReferenceManyField label="Employees" reference="employees" target="library_id">
                    <Datagrid>
                        <TextField source="first_name" />
                        <TextField source="middle_initial" />
                        <TextField source="last_name" />
                        <TextField source="job_title" />
                        <TextField source="email_address" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);