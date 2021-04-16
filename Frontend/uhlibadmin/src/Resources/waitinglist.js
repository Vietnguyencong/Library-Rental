import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, ReferenceField, TextInput, Show } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import { List, Datagrid, TextField, NumberInput , PasswordInput, EmailField, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const WaitFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="user_id" alwaysOn />
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
        </Datagrid>
    </List>
);


export const WaitCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
        <Typography variant="h6" gutterBottom>New waitlist item</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
            <Grid item xs={6}>
                    <NumberInput source="user_id"  min={0}/>
                </Grid>
                <Grid item xs={6}>
                    <NumberInput source="item_id" min={0}/>
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
                    <NumberInput source="user_id"  min={0}/>
                </Grid>
                <Grid item xs={6}>
                    <NumberInput source="item_id" min={0}/>
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
        <SimpleForm>
        <Typography variant="h6" gutterBottom>Showing Information</Typography>
        <Grid container spacing={1} style={{ width: "100%" }}>
            <Grid item xs={6}> 
                <Typography variant="inline" gutterBottom> user: </Typography>        
                <ReferenceField source="user_id" reference="users" link={false}><TextField source="first_name" /></ReferenceField>
            </Grid>
                <Grid item xs={6}>
                    <Typography variant="inline" gutterBottom> item: </Typography>
                    <ReferenceField source="item_id" reference="items" link={false}><TextField source="title" /></ReferenceField>
            </Grid>
        </Grid> 
        </SimpleForm>
    </Edit>
);