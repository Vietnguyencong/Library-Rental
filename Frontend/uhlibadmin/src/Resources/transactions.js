import * as React from "react";
import { List, Datagrid, TextField, EmailField, DateField, NumberField, ReferenceField, ReferenceInput, TextInput, SimpleForm, Edit, DateInput, NumberInput, SelectInput, BooleanField,BooleanInput,DateTimeInput, Create,Filter, Show, SimpleShowLayout, RichTextField } from 'react-admin';
import TrueIcon from '@material-ui/icons/Done'
import FalseIcon from '@material-ui/icons/Clear'

// custom boolean field 
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
        <ReferenceInput label="Search by User" source="user_id" reference="users" allowEmpty>
            <SelectInput optionText="first_name" />
        </ReferenceInput>
    </Filter>
);
export const TransactionList = props => (
    <List filters={<TransactionFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="user_id" reference="users"><TextField source="first_name" /></ReferenceField>
            <TextField source="transaction_id" ></TextField>
            {/* <NumberField source="is_commit" /> */}
            <MyBooleanfield source="is_commit" />
            <DateField source="date_created" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);


export const TransactionEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id" reference="users"><SelectInput optionText="first_name" /></ReferenceInput>
            <BooleanInput source="is_commit" />
            <TextField disabled source="transaction_id" ></TextField>
            <DateTimeInput disabled source="date_created" />
            <DateTimeInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);


export const TransactionCreate = props =>(
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id" reference="users"><SelectInput optionText="first_name" /></ReferenceInput>
            <BooleanInput source="is_commit" />
        </SimpleForm>
    </Create>
)

export const TransactionShow = props =>{
    return <Show {...props}>
    <SimpleShowLayout>
        <ReferenceField source="user_id" reference="users">
            <TextField source="first_name"></TextField>
        </ReferenceField>
    </SimpleShowLayout>
</Show>
}