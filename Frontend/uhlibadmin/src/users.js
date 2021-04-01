import * as React from "react";
import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, DateField, EditButton } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

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
    <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id" />
      
        <TextField source="first_name" />
        <TextField source="middle_initial" />
        <TextField source="last_name" />
        <TextField source="phone_number" />
        <EmailField source="email_address" />
        <TextField source="zip_code" />
        <TextField source="city" />
        <TextField source="state" />
        <TextField source="street_number" />
    </Datagrid>
</List>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="user" />
            <TextInput source="data" options={{ multiLine: true }} />
            {/* <RichTextInput source="body" /> */}
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
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