import * as React from "react";
import { List, Datagrid, TextField, EmailField, DateField, NumberField, ReferenceField, ReferenceInput, TextInput, SimpleForm, Edit, DateInput, NumberInput, SelectInput, BooleanField,BooleanInput,DateTimeInput, Create,Filter } from 'react-admin';

const TransactionFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Search by User" source="user_id" reference="users" alwaysOn>
            <SelectInput optionText="first_name" />
        </ReferenceInput>
    </Filter>
);
export const TransactionList = props => (
    <List filters={<TransactionFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="user_id" reference="users"><TextField source="first_name" /></ReferenceField>
            <NumberField source="is_commit" />
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
            <DateTimeInput disabled source="date_created" />
            <DateTimeInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);


export const TransactionCreate = props =>(
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id"            reference="users"><SelectInput optionText="first_name" /></ReferenceInput>
            <BooleanInput source="is_commit" />
        </SimpleForm>
    </Create>
)

