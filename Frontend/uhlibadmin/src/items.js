import * as React from "react";
import { List, Datagrid, TextField, ReferenceField, NumberField, DateField, EditButton } from 'react-admin';

export const ItemList = props => (
    <List {...props}>

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