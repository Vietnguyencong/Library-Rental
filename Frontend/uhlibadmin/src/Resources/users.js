import * as React from "react";
import { Filter, Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, DateField, EditButton } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const UserList = props => (
    // <List {...props}>
    //     <Datagrid rowClick="edit">
    //         <TextField source="id" />
    //         <TextField source="name" />
    //         <TextField source="username" />
    //         <EmailField source="email" />
    //         <TextField source="address.street" />
    //         <TextField source="phone" />
    //         <TextField source="website" />
    //         <TextField source="company.name" />
    //     </Datagrid>
    // </List>
    <List filters={<UserFilter />} {...props}>
    <Datagrid rowClick="edit">
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
    </Datagrid>
</List>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>New User</Typography>
                    <TextInput source="first_name" fullWidth />
                    <TextInput source="middle_initial" fullWidth />
                    <TextInput source="last_name" fullWidth />
                    <TextInput source="email_address" fullWidth />
                    <NumberInput source="phone_number" fullWidth />
                    <TextInput source="social_security" fullWidth />
                    <PasswordInput source="user_password" fullWidth />

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom> &nbsp; </Typography>
                    <NumberInput source="street_number" fullWidth />
                    <TextInput source="street_name" fullWidth />
                    <TextInput source="city" fullWidth />
                    <TextInput source="state" fullWidth />
                    <NumberInput source="zip_code" fullWidth />
                    <TextInput source="discount_id" defaultValue="1" fullWidth />
                    <TextInput source="is_admin" defaultValue="1" fullWidth />
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);

// export const UserEdit = (props) => (
//     <Edit {...props}>
//         <SimpleForm>
//             <TextInput disabled label="Id" source="id" />
//             <TextInput source="title" validate={required()} />
//             <TextInput multiline source="teaser" validate={required()} />
//             <RichTextInput source="body" validate={required()} />
//             <DateInput label="Publication date" source="published_at" />
//             <ReferenceManyField label="Comments" reference="comments" target="post_id">
//                 <Datagrid>
//                     <TextField source="body" />
//                     <DateField source="created_at" />
//                     <EditButton />
//                 </Datagrid>
//             </ReferenceManyField>
//         </SimpleForm>
//     </Edit>
// );