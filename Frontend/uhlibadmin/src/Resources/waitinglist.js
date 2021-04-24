import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, ReferenceField,DateField, TextInput, Show, DateInput } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import { List, Datagrid, TextField, TabbedShowLayout , Tab,AutocompleteInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const WaitFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user id" source="user_id" alwaysOn />
        {/* <ReferenceInput label="Items" source="title" reference="items" allowEmpty>
            <SelectInput optionText="name" />
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

export const WaitList = props => (
    <List filters={<WaitFilter/>} {...props}>
        <Datagrid rowClick="show">
        <ReferenceField source="user_id" reference="users" link={false}><TextField source="first_name" /></ReferenceField>
        <ReferenceField source="item_id" reference="items" link={false}><TextField source="title" /></ReferenceField>
        <DateField  source= "created_at" showTime > </DateField>
        <DateField  source= "updated_at" showTime > </DateField>
        </Datagrid>
    </List>
);


export const WaitCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
        <Typography variant="h6" gutterBottom>New waitlist item</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
            <Grid item xs={6}>
            <ReferenceInput source="user_id" reference="users" >
                        <AutocompleteInput optionText="first_name" fullWidth/>
                        </ReferenceInput>
                </Grid>
                <Grid item xs={6}>
                <ReferenceInput source="item_id" reference="items" >
                        <AutocompleteInput optionText="title" fullWidth/>
                        </ReferenceInput>
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);

export const WaitEdit = (props) =>(
    <Edit actions={<EditActions/>} {...props}>
        <SimpleForm>
        <Typography variant="h6" gutterBottom>Edit Information</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                <ReferenceInput source="user_id" reference="users" >
                        <AutocompleteInput optionText="first_name" fullWidth/>
                        </ReferenceInput>
                        <DateInput disabled source= "created_at" showTime > </DateInput>
                </Grid>
                <Grid item xs={6}>
                <ReferenceInput source="item_id" reference="items" >
                        <AutocompleteInput optionText="title" fullWidth/>
                        </ReferenceInput>
                        <DateInput disabled source= "updated_at" showTime > </DateInput>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


{/*const WaitTitle = ({ record }) => {
    return <span>Waitlist item {record ? `${record.id}` : ''}</span>;
}; */}

export const WaitShow = (props) => (    
    <Edit actions={<ShowActions/>} {...props}>
        <TabbedShowLayout syncWithLocation={false}>
            <Tab label="Summary">
                User:<ReferenceField source="user_id" reference="users" link={false}><TextField source="first_name" /></ReferenceField>
                Item: <ReferenceField source="item_id" reference="items" link={false}><TextField source="title" /></ReferenceField>
                Created at: <DateField  source= "created_at" showTime > </DateField>
                Updated at: <DateField  source= "updated_at" showTime > </DateField>
        </Tab>
        </TabbedShowLayout>
    </Edit>
);