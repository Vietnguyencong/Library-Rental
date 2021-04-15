import * as React from "react";
import { List, Datagrid, TextField, DateField, NumberField, ReferenceField, ReferenceInput, TextInput, SimpleForm, Edit, NumberInput, SelectInput, BooleanInput,DateTimeInput, Create,Filter, Show, SimpleShowLayout, AutocompleteInput } from 'react-admin';
import {Actions, MyBooleanfield} from "./helper";
import {Grid} from '@material-ui/core'
const LoanitemFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Search by Transaction_id" source="transaction_id" reference="transactions" alwaysOn>
            <AutocompleteInput optionText="transaction_id" />
        </ReferenceInput>
        {/* <NumberInput label="search by item_id" source="item_id" alwaysOn/> */}
        <ReferenceInput label="Search by item title" source="item_id" reference="items" allowEmpty>
            <AutocompleteInput optionText="title" />
        </ReferenceInput>
    </Filter>
);




export const LoanitemList = props => (
    <List filters={<LoanitemFilter/>} {...props}>
        <Datagrid rowClick="edit">
            {/* <NumberField source="id"/> */}
            <ReferenceField source="item_id" reference="items"><TextField source="title" /></ReferenceField>
            <NumberField source="quantity" />
            <TextField source="transaction_id" />
            <MyBooleanfield source="is_due" />
            <DateField source="date_due" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            {/* <TextField source="created_by" />
            <TextField source="updated_by" /> */}
        </Datagrid>
    </List>
);



export const LoanitemEdit = props => (
    <Edit actions={<Actions/>} {...props}>
        <SimpleForm >
            <Grid container spacing={1} style={{width:"100%"}}>
                <Grid item xs={6}>
                    <ReferenceInput  source="transaction_id" reference="transactions">
                        <AutocompleteInput  optionText="transaction_id" fullWidth/>
                    </ReferenceInput >
                    <ReferenceInput source="item_id" reference="items" >
                        <AutocompleteInput optionText="title" fullWidth/>
                    </ReferenceInput>
                    <DateTimeInput disabled source="date_created" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                  
                    <BooleanInput source="is_due" fullWidth/>
                    <NumberInput source="quantity" fullWidth/><br></br>
                    <DateTimeInput disabled source="updated_at" fullWidth />
                </Grid>
            </Grid>
           
        </SimpleForm>
    </Edit>
);



export const LoanitemCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput  source="transaction_id" reference="transactions">
                <AutocompleteInput  optionText="transaction_id" />
            </ReferenceInput >
            <ReferenceInput source="item_id" reference="items" >
                <AutocompleteInput optionText="title"/>
            </ReferenceInput>
            <BooleanInput source="is_due" />
            <NumberInput source="quantity" />
            <DateTimeInput disabled source="date_created" />
            <DateTimeInput disabled source="updated_at" />
        </SimpleForm>
    </Create>
);


export const LoanitemShow = props =>{
    return <Show {...props}>
    <SimpleShowLayout>
    <NumberField source="id"/>
            <NumberField source="item_id"/>
            <NumberField source="quantity" />
            <TextField source="transaction_id" />
            <NumberField source="is_due" />
            <DateField source="date_due" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
    </SimpleShowLayout>
</Show>
}