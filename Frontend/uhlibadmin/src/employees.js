import * as React from "react";
import { List, Datagrid, TextField, ReferenceField, NumberField, DateField, EditButton } from 'react-admin';

export const EmployeeList = props => (
    <List {...props}>


<Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="library_id" reference="libraries"><TextField source="id" /></ReferenceField>
            <TextField source="job_title" />
            <TextField source="first_name" />
            <TextField source="middle_initial" />
            <TextField source="last_name" />
            <TextField source="email_address" />
            <NumberField source="salary" />
            <NumberField source="hourly_rate" />
            <NumberField source="street_number" />
            <TextField source="street_name" />
            <TextField source="city" />
            <TextField source="state" />
            <NumberField source="zipcode" />
            <TextField source="password" />
            {/* <TextField source="created_by" />
            <TextField source="updated_by" />
            <DateField source="created_at" />
            <DateField source="updated_at" /> */}
        </Datagrid>
            

    </List>
);