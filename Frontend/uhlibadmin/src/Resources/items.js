import * as React from "react";
import { ImageField, Show, Edit, Create, SimpleForm, List, Datagrid, DateInput, TextField, NumberInput, ReferenceManyField, Filter, RadioButtonGroupInput, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput, BooleanInput } from 'react-admin';
import { TopToolbar, ListButton} from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
import {Actions, MyBooleanfield} from './helper'
import { TabbedShowLayout, Tab } from 'react-admin'

const ItemsFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search by title" source="item_type" alwaysOn /> */}
        <RadioButtonGroupInput source="item_type" choices={[
            { id: "", name:"All"},
            { id: 'Book', name: 'Book' },
            { id: 'Media', name: 'Media' },
            { id: 'Printer', name: 'Printer' }
        ]} alwaysOn/> 
        <TextInput label="Search by title" source="title"/>
        <NumberInput label="Search by library" source="library_id"/>
        <NumberInput label="Search by availability" source="is_available"/>

        {/* <ReferenceInput label="Library" source="library_id" reference="libraries" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);


export const ItemList = props => (
    <List filters={<ItemsFilter />} {...props}>

<Datagrid rowClick="show">
<TextField source="title" />
            <NumberField source="item_id" label="item_id"/>
            <TextField source="title" />
            {/* <NumberField source="current_quantity" /> */}
            {/* <NumberField source="stock" /> */}
            <NumberField source="price" />
            <NumberField source="rent_period" />
            <MyBooleanfield source="is_available" />
            <TextField source="item_type" />
            <TextField source="library_id" />
            {/* <DateField source="created_by" /> */}
            {/* <DateField source="updated_by" /> */}
            <DateField source="created_at" showTime/>
            <DateField source="updated_at" showTime/>
            {/* <ReferenceField source="library_id" reference="libraries"><TextField source="id" /></ReferenceField> */}
            <TextField source="id" />
            <TextField label="Description" source="shortDescr"/>
        </Datagrid>
    </List>
);

const ShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

const CreateActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const ItemCreate = (props) => (
    <Create actions={<CreateActions/>} {...props}>
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
                    <NumberInput source="price" min={0} fullWidth />
                    {/* <NumberInput disabled source="current_quantity" min={0} default="1" fullWidth />     */}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <BooleanInput source="is_available" fullWidth />
                    <NumberInput source="rent_period" min={1} fullWidth />
                    {/* <NumberInput source="stock" min={0} fullWidth /> */}
                    <NumberInput source="library_id" min={0} fullWidth />
                </Grid>
                <Grid item xs={5} >
                    <TextInput label="Description" source="shortDescr" fullWidth/>
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
                    <Typography variant="h6" gutterBottom>Edit Library Item</Typography>
                    <TextInput source="title" fullWidth />
                    <RadioButtonGroupInput source="item_type" choices={[
                    { id: 'Book', name: 'Book' },
                    { id: 'Media', name: 'Media' },
                    { id: 'Printer', name: 'Printer' },
                    ]} />    
                    <NumberInput source="price" min={0} fullWidth />
                    {/* <NumberInput source="current_quantity" min={0} default="1" fullWidth />  */}
                    <TextInput label="Description" source="shortDescr" fullWidth/>   
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <BooleanInput source="is_available" fullWidth />
                    <NumberInput source="rent_period" min={1} fullWidth />
                    {/* <NumberInput source="stock" min={0} fullWidth /> */}
                    <NumberInput source="library_id" min={0} fullWidth />
                    <Grid item xs={3}>
                    <DateInput disabled source= "created_at" showTime > </DateInput>
                    </Grid>
                    <Grid item xs={3}>
                    <DateInput disabled source= "updated_at" showTime > </DateInput>
                    </Grid>
                </Grid>
           </Grid>
       </SimpleForm>
   </Edit>
)


export const ItemShow = (props) =>(
    <Show actions={<ShowActions/>} {...props}>
        <TabbedShowLayout>
       {/* <SimpleForm> */}
            <Tab label="Information">
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
                            {/* <Typography variant="subtitle2" gutterBottom>
                                Total quantity: <NumberField source="current_quantity" default="1" fullWidth />    
                            </Typography> */}

                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                is_available: <MyBooleanfield source="is_available" fullWidth />
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                            Rent_period:<NumberField source="rent_period" fullWidth />
                            </Typography>
                            {/* <Typography variant="subtitle2" gutterBottom>
                            Stock: <NumberField source="stock" fullWidth />
                            </Typography> */}
                            <Typography variant="subtitle2" gutterBottom>
                            Library_id: <NumberField source="library_id" fullWidth />
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                            Created at: <DateField  source= "created_at" showTime > </DateField>
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                        Updated at: <DateField  source= "updated_at" showTime > </DateField>
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                            
                            <ImageField source="imageLink" title="Image"/>   
                            
                        </Grid>
                </Grid>
                </Tab>
                <Tab label="TRANSACTIONS">
                    <ReferenceManyField Label="" reference="loanitem" target="item_id" addLabel={false}>
                        <Datagrid>
                            <ReferenceField source="transaction_id" reference="transactions">
                                <TextField source="transaction_id" />
                            </ReferenceField>
                            <ReferenceField source="id" reference="users">
                                <TextField source="first_name" />
                            </ReferenceField>
                            <DateField source="created_at" showTime />
                            <DateField source="updated_at" showTime />
                          
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
       {/* </SimpleForm> */}
       </TabbedShowLayout>
   </Show>
)
