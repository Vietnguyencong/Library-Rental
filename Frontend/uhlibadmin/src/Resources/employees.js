import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TabbedShowLayout, DateField, DateInput, TextInput, Tab } from 'react-admin';
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
            <NumberField source="library_id" fullWidth/>
            <TextField source="first_name" fullWidth/>
            <TextField source="middle_initial" fullWidth/>
            <TextField source="last_name" fullWidth/>
            <EmailField source="email_address" fullWidth/>
            <TextField source="job_title" fullWidth/>
            <NumberField source="salary" fullWidth/>
            <NumberField source="hourly_rate" fullWidth/>
            <NumberField source="street_number" fullWidth/>
            <TextField source="street_name" fullWidth/>
            <TextField source="city" fullWidth/>
            <TextField source="state" fullWidth/>
            <TextField source="zipcode" fullWidth/>
            {/*<TextField source="password" fullWidth/>*/}
            <DateField  source= "created_at" showTime > </DateField>
            <DateField  source= "updated_at" showTime > </DateField>
        </Datagrid>
    </List>
);



export const EmployeeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New Employee</Typography>
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
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />
                    <NumberInput source="salary" min={0} fullWidth />
                    <NumberInput source="street_number"min={0} fullWidth />
                    <TextInput source="city" fullWidth/>
                    <PasswordInput source="password" fullWidth/>
                    <DateInput disabled source= "created_at" showTime > </DateInput>
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
                    <DateInput disabled source= "updated_at" showTime > </DateInput>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


export const EmployeeShow = props => (    
    <Edit actions={<ShowActions/>} {...props}>
        <TabbedShowLayout syncWithLocation={false}>
            <Tab label="Summary">
            First Name: <TextField source="first_name" />
            Library ID: <NumberField source="library_id" />
            Last Name: <TextField source="last_name" />
            Middle Initial: <TextField source="middle_initial" />
            Email Address: <TextField source="email_address" />
            Job Title: <TextField source="job_title" />
            Salary: <NumberField source="salary" />
            Hourly Rate: <NumberField source="hourly_rate" />
            Street Number: <NumberField source="street_number" />
            Zipcode: <NumberField source="zipcode" />
            City: <TextField source="city" />
            Street Name: <TextField source="street_name" />
            Password: <TextField source="password" />
            State: <TextField source="state" />
            Created at: <DateField  source= "created_at" showTime > </DateField>
            Updated at:<DateField  source= "updated_at" showTime > </DateField>
           
        </Tab>
        </TabbedShowLayout>
    </Edit>
)
