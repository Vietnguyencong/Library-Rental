import * as React from "react";
import { List, Datagrid, TextField, ReferenceField, NumberField, DateField, EditButton } from 'react-admin';

export const LibraryList = props => (
    <List {...props}>

<Datagrid rowClick="edit">
            <TextField source="title" />
            
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="opening_hours" />
            <TextField source="location" />
            
        </Datagrid>
    </List>
);