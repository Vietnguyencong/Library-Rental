import * as React from "react";
import { List, Datagrid, TextField, EmailField, Filter, ReferenceInput, SelectInput, ReferenceField, NumberField, DateField, EditButton, TextInput } from 'react-admin';

const EmployeesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Employees" source="first_name" reference="employees" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const EmployeeList = props => (
    <List filters={<EmployeesFilter />} {...props}>


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