import * as React from "react";
import {AutocompleteInput, CloneButton, List, ChipField,ReferenceField, Datagrid, TextField, EmailField, DateField, NumberField,  ReferenceInput, TextInput, SimpleForm, Edit, DateInput, NumberInput, SelectInput,BooleanInput,DateTimeInput, Create,Filter, Show, SimpleShowLayout, RichTextField, ReferenceManyField, SingleFieldList, BooleanField } from 'react-admin';
import TrueIcon from '@material-ui/icons/Done'
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import FalseIcon from '@material-ui/icons/Clear'
import {Grid} from '@material-ui/core'
import {Actions} from "./helper"

const MyBooleanfield = ({ record={}, source}) =>{
    if (record[source] === 1 ){
        return <div>
            <TrueIcon/> 
        </div>
    }
    else{
        return <div><FalseIcon/></div>
    }
}



const TransactionFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Search by User" source="user_id" reference="users" alwaysOn>
            <SelectInput optionText="first_name" />
        </ReferenceInput>
        <TextInput label="search by transaction ID" source="transaction_id" alwaysOn/>
    </Filter>
);
export const TransactionList = props => (
    <List filters={<TransactionFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="user_id" reference="users"><TextField source="first_name" /></ReferenceField>
            
            {/* <ReferenceManyField label="Items cart" reference="loanitem" target="transaction_id" >
                <SingleFieldList>
                    <ChipField source="item_id"></ChipField>
                </SingleFieldList>
            </ReferenceManyField> */}
            <TextField source="transaction_id" ></TextField>
            {/* <NumberField source="is_commit" /> */}
            <MyBooleanfield source="is_commit" />
            <DateField source="date_created" showTime />
            <DateField source="updated_at" showTime />
            {/* <CreateRelatedButton/> */}
            <CloneButton/>
        </Datagrid>
    </List>
);

export const TransactionEdit = props => (
    <Edit actions={<Actions/>} {...props}>
        <SimpleForm>
           <Grid container spacing={1} style={{width:"100%"}}>
                <Grid item xs={6}>
                    <ReferenceInput source="user_id" reference="users"><SelectInput optionText="first_name" /></ReferenceInput>
                    <BooleanInput source="is_commit" max={1} min={0} />
                    <NumberInput disabled source="total_price"></NumberInput>
                    <NumberInput disabled source="total_quantity"></NumberInput>
                    <TextInput disabled source="transaction_id" fullWidth ></TextInput>
                    <DateInput disabled source="date_created" fullWidth />
                    <DateTimeInput disabled source="updated_at" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                <ReferenceManyField label="Items cart" reference="loanitem" target="transaction_id" >
                    <Datagrid>
                        <ReferenceField source="item_id" reference="items"><TextField source="title" /></ReferenceField>
                        <NumberField source="quantity"/>
                        <ReferenceField source="item_id" reference="items"><NumberField source="price"  options={{ style: 'currency', currency: 'USD' }} /></ReferenceField>
                    </Datagrid>
                </ReferenceManyField>
                {/* <CreateRelatedButton/> */}
                </Grid>
           </Grid>
            
            
        </SimpleForm>
    </Edit>
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

export const TransactionCreate = props =>(
    <Create actions={<CreateActions/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id" reference="users"><SelectInput optionText="first_name" /></ReferenceInput>
            <BooleanInput source="is_commit" />
        </SimpleForm>
    </Create>
)

export const TransactionShow = props =>{
    return <Show actions={<ShowActions/>} {...props}>
        <SimpleShowLayout>
    <Grid container spacing={1} style={{width:"100%"}}>
        <Grid item xs={6}>
        <ReferenceField source="user_id" reference="users">
            <TextField source="first_name"></TextField>
        </ReferenceField>
        <MyBooleanfield source="is_commit" />
        <TextField disabled source="transaction_id" ></TextField>
        <DateField disabled source="date_created" />
        <DateField disabled source="updated_at" />
        </Grid>
        <Grid item xs={6}>
        <ReferenceManyField label="Items cart" reference="loanitem" target="transaction_id" >
            <Datagrid>
                <ReferenceField source="item_id" reference="items"><TextField source="title" /></ReferenceField>
                <NumberField source="quantity"/>
            </Datagrid>
        </ReferenceManyField>
        </Grid>
    </Grid>
    </SimpleShowLayout>
        
</Show>
}