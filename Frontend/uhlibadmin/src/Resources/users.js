import * as React from "react";
import {ReferenceField,ReferenceManyField, DateField, NumberField, Filter, DateInput, Create, Edit, SimpleForm, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
import { TabbedShowLayout, Tab } from 'react-admin'

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by city" source="city" alwaysOn />
        <TextInput label="Search by state" source="state" alwaysOn />
        <TextInput label="Search by first name" source="first_name"  />
        <TextInput label="Search by last name" source="last_name"  />
        <TextInput label="Search by email_address name" source="email_address"  />
        {/* <ReferenceInput label="User" source="id" reference="users" allowEmpty>
            <SelectInput optionText="first_name" />
        </ReferenceInput> */}
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

const CreateActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const UserList = props => (
    <List filters={<UserFilter/>} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="middle_initial" />
            <TextField source="last_name" />
            <TextField source="phone_number" />
            <EmailField source="email_address" />
            <TextField source="street_number" />
            <TextField source="street_name" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zip_code" />
            <DateField  source= "created_at" showTime > </DateField>
            <DateField  source= "updated_at" showTime > </DateField>
        </Datagrid>
    </List>
);

export const UserCreate = (props) => (
    <Create actions={<CreateActions/>} {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New User Information </Typography>
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />
                    <NumberInput source="phone_number" min={0} fullWidth />
                    <TextInput source="social_security" fullWidth />
                    <PasswordInput source="user_password" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp;  </Typography>
                    <NumberInput source="street_number" min={0} fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="city" fullWidth />
                    <TextInput source="state" fullWidth />
                    <NumberInput source="zip_code" min={0} fullWidth />
                    <TextInput source="discount_id" defaultValue="1" fullWidth />
                    <TextInput source="is_admin" defaultValue="1" fullWidth />
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);



export const UserEdit = (props) =>(
    <Edit actions={<EditActions/>} {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                <Typography variant="h6" gutterBottom> User Information </Typography>

                    <TextInput source="first_name" fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />
                    <NumberInput source="phone_number" min={0} fullWidth />
                    <TextInput source="social_security" fullWidth />
                    <PasswordInput disabled source="user_password" fullWidth />
                    <DateInput disabled source= "created_at" showTime > </DateInput>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <NumberInput source="street_number" min={0} fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="city" fullWidth />
                    <TextInput source="state" fullWidth />
                    <NumberInput source="zip_code" min={0} fullWidth />
                    <TextInput source="discount_id" defaultValue="1" fullWidth />
                    <TextInput source="is_admin" defaultValue="1" fullWidth />
                    <DateInput disabled source= "updated_at" showTime > </DateInput>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)

// const UserTitle = ({ record }) => {
//     return <span>User {record ? `${record.last_name}` : ''}</span>;
// };

// export const UserShow = (props) => (    
//     <Show  title={<UserTitle/>}{...props} >
//         <SimpleForm>
//             <Typography variant="h6" gutterBottom>New User</Typography>
//             <TextField source="first_name" fullWidth />
//             <TextField source="middle_initial" fullWidth />
//             <TextField source="last_name" fullWidth />
//             <TextField source="email_address" fullWidth />
//             <NumberField source="phone_number" fullWidth />
//             <TextField source="social_security" fullWidth />
//             <TextField source="user_password" fullWidth />
//             <Typography variant="h6" gutterBottom> &nbsp; </Typography>
//             <NumberField source="street_number" fullWidth />
//             <TextField source="street_name" fullWidth />
//             <TextField source="city" fullWidth />
//             <TextField source="state" fullWidth />
//             <NumberField source="zip_code" fullWidth />
//             <TextField source="discount_id" defaultValue="1" fullWidth />
//             <TextField source="is_admin" defaultValue="1" fullWidth />
//         </SimpleForm>
//     </Show>
// );

export const UserShow = (props) => (
    <Show actions={<ShowActions/>} {...props}>
        <TabbedShowLayout syncWithLocation={false}>
            <Tab label="summary">
                <TextField label="First Name" source="first_name" />
                <TextField source="middle_initial" />
                <TextField source="last_name" />
                <TextField source="email_address" fullWidth />
                <NumberField source="phone_number" fullWidth />
                <TextField source="social_security" fullWidth />
                <TextField source="user_password" fullWidth />
                <DateField  source= "created_at" showTime > </DateField>
                <DateField  source= "updated_at" showTime > </DateField>
            </Tab>
            <Tab label="address" >
                <NumberField source="street_number" fullWidth />
                <TextField source="street_name" fullWidth />
                <TextField source="city" fullWidth />
                <TextField source="state" fullWidth />
                <NumberField source="zip_code" fullWidth />
            </Tab>
            <Tab label="Others" path="miscellaneous">
                <TextField label="Discount id" source="discount_id" defaultValue="1" fullWidth />
            </Tab>
            <Tab label="Transactions" >
                <ReferenceManyField Label="User transactions" reference="transactions" target="user_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="transaction_id" reference="transactions">
                            <TextField source="transaction_id" />
                        </ReferenceField>
                        <DateField source="date_created" showTime />
                        <DateField source="updated_at" showTime />
                        <NumberField disabled source="total_price"></NumberField>
                        <NumberField disabled source="total_quantity"></NumberField>
                        <NumberField source="is_commit" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);