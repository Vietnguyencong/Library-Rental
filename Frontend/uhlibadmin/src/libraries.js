import * as React from "react";
import { List, Datagrid, TextField, EmailField, Filter, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput } from 'react-admin';

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
            <TextField source="title" />
            
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="opening_hours" />
            <TextField source="location" />
            
        </Datagrid>
    </List>
);