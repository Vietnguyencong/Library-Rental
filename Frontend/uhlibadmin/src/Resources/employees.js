import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm,ReferenceField, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
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

const EditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

const ShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const EmployeeList = props => (
    <List filters={<EmployeesFilter />} {...props}>
        <Datagrid rowClick="show">
            <NumberField source="id" fullWidth/>
            {/*<ReferenceField source="library_id" reference="libraries"><TextField source="name" /></ReferenceField>*/} 
            <NumberField source="library_id" fullWidth/>
            <TextField source="first_name" fullWidth/>
            <TextField source="middle_initial" fullWidth/>
            <TextField source="last_name" fullWidth/>
            <TextField source="email_address" fullWidth/>
            <TextField source="job_title" fullWidth/>
            <NumberField source="salary" fullWidth/>
            <NumberField source="hourly_rate" fullWidth/>
            <NumberField source="street_number" fullWidth/>
            <TextField source="street_name" fullWidth/>
            <TextField source="city" fullWidth/>
            <TextField source="state" fullWidth/>
            <NumberField source="zipcode" fullWidth/>
            <TextField source="password" fullWidth/>
        </Datagrid>
    </List>
);



export const EmployeeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Employee</Typography>
                    <NumberInput source="id" min={0} fullWidth />
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />
                    <NumberInput source="salary" min={0} fullWidth />
                    <NumberInput source="street_number"min={0} fullWidth />
                    <TextInput source="city" fullWidth/>
                    <PasswordInput source="password" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <NumberInput source="library_id" min={0} fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="job_title" fullWidth />
                    <NumberInput source="hourly_rate" min={0} fullWidth />
                    <NumberInput source="zipcode" min={0} fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="state" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);



export const EmployeeEdit = (props) =>(
    <Edit actions={<EditActions/>} {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
            <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>Edit Employee</Typography>
                    <NumberInput source="id" min={0} fullWidth />
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />
                    <NumberInput source="salary" min={0} fullWidth />
                    <NumberInput source="street_number"min={0} fullWidth />
                    <TextInput source="city" fullWidth/>
                    <PasswordInput source="password" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <NumberInput source="library_id" min={0} fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="job_title" fullWidth />
                    <NumberInput source="hourly_rate" min={0} fullWidth />
                    <NumberInput source="zipcode" min={0} fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="state" fullWidth/>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


export const EmployeeShow = props => (    
    <Edit actions={<ShowActions/>} {...props}>
        <SimpleForm>
            <Typography variant="h6" gutterBottom>Employee Information</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
            <Grid item xs={12} sm={6}>
            Employee ID: <NumberField source="id" />
            </Grid>
            {/*<ReferenceField source="library_id" reference="libraries"><TextField source="id" /></ReferenceField> */}
            <Grid item xs={12} sm={6}>
            Library ID: <NumberField source="library_id" />
            </Grid>
            <Grid item xs={12} sm={6}>
            First Name: <TextField source="first_name" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Middle Initial: <TextField source="middle_initial" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Last Name: <TextField source="last_name" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Job Title: <TextField source="job_title" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Email Address: <TextField source="email_address" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Hourly Rate: <NumberField source="hourly_rate" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Salary: <NumberField source="salary" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Zipcode: <NumberField source="zipcode" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Street Number: <NumberField source="street_number" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Street Name: <TextField source="street_name" />
            </Grid>
            <Grid item xs={12} sm={6}>
            City: <TextField source="city" />
            </Grid>
            <Grid item xs={12} sm={6}>
            State: <TextField source="state" />
            </Grid>
            <Grid item xs={12} sm={6}>
            Password: <TextField source="password" />
            </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)
