import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

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

        <Datagrid rowClick="show">
            <NumberField source="id" fullWidth/>
            {/*<ReferenceField source="library_id" reference="libraries"><TextField source="id" /></ReferenceField> */}
            <NumberField source="library_id" fullWidth/>
            <TextField source="job_title" fullWidth/>
            <TextField source="first_name" fullWidth/>
            <TextField source="middle_initial" fullWidth/>
            <TextField source="last_name" fullWidth/>
            <TextField source="email_address" fullWidth/>
            <NumberField source="salary" fullWidth/>
            <NumberField source="hourly_rate" fullWidth/>
            <NumberField source="street_number" fullWidth/>
            <TextField source="street_name" fullWidth/>
            <TextField source="city" fullWidth/>
            <TextField source="state" fullWidth/>
            <NumberField source="zipcode" fullWidth/>
            <TextField source="password" fullWidth/>
            {/* <TextField source="created_by" />
            <TextField source="updated_by" />
            <DateField source="created_at" />
            <DateField source="updated_at" /> */}
        </Datagrid>
    </List>
);



export const EmployeeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Employee</Typography>
                    <NumberInput source="library_id" fullWidth />
                    <TextInput source="job_title" fullWidth />
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <NumberInput source="salary" fullWidth />
                    <NumberInput source="hourly_rate" fullWidth />
                    <NumberInput source="street_number" fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="city" fullWidth/>
                    <TextInput source="state" fullWidth/>
                    <NumberInput source="zipcode" fullWidth />
                    <PasswordInput source="password" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);



export const EmployeeEdit = (props) =>(
     <Edit {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
            <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Edit Employee</Typography>
                    <NumberInput source="id" fullWidth />
                    <NumberInput source="library_id" fullWidth />
                    <TextInput source="job_title" fullWidth />
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <NumberInput source="salary" fullWidth />
                    <NumberInput source="hourly_rate" fullWidth />
                    <NumberInput source="street_number" fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="city" fullWidth/>
                    <TextInput source="state" fullWidth/>
                    <NumberInput source="zipcode" fullWidth />
                    <PasswordInput source="password" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


const EmployeeTitle = ({ record }) => {
    return <span>Employee  {record ? `${record.id}` : ''}</span>;
};

export const EmployeeShow = props => (    
    <Show  title={<EmployeeTitle/>}{...props} > 
        <SimpleForm>
            <Typography variant="h6" gutterBottom>Employee</Typography>
            <NumberField source="id" />
            {/*<ReferenceField source="library_id" reference="libraries"><TextField source="id" /></ReferenceField> */}
            <NumberField source="library_id" />
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
        </SimpleForm>
    </Show>
)