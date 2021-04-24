import * as React from "react";
import { NumberField, Filter, Create, Edit, SimpleForm, TextInput, DateField, ReferenceField,  Show, BooleanField, NullableBooleanInput } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import { List, Datagrid, TextField, NumberInput ,AutocompleteInput, TabbedShowLayout, Tab, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const PaidFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by user ID" source="users_id" alwaysOn />
        { <ReferenceInput label="User ID" source="users_id" reference="paidfines" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> }
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

export const PaidList = props => (
    <List filters={<PaidFilter/>} {...props}>
        <Datagrid rowClick="show">
        <ReferenceField source="users_id" reference="users" link={false}><TextField source="first_name" /></ReferenceField>
            <NumberField source="loan_id" />
            <TextField source="description" />
            <NumberField source="final_amount" />
            <NumberField source="is_paid" />
            {/*<DateField  source= "created_at" showTime > </DateField>
            <DateField  source= "updated_at" showTime > </DateField> */}
        </Datagrid>
    </List>
);


export const FinesCreate = (props) => (
    <Create actions={<CreateActions/>} {...props}>
        <SimpleForm>
        <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                <ReferenceInput source="users_id" reference="users" >
                        <AutocompleteInput optionText="first_name" fullWidth/>
                        </ReferenceInput>
                    <TextInput source="description" fullWidth/>
                    <BooleanInput source="is_paid" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                    <NumberInput source="loan_id"  min={0} fullWidth/>
                    <NumberInput source="final_amount"  min={0} fullWidth/>
                    </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);



export const FinesEdit = (props) =>(
    <Edit actions={<EditActions/>} {...props}>
        <SimpleForm>
        <Typography variant="h6" gutterBottom>Edit Fine</Typography>
            <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={6}>
                <ReferenceInput source="user_id" reference="users" >
                        <AutocompleteInput optionText="first_name" fullWidth/>
                        </ReferenceInput>
                    <TextInput source="description" fullWidth/>
                    <BooleanInput source="is_paid" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                    <NumberInput source="loan_id"  min={0} fullWidth/>
                    <NumberInput source="final_amount"  min={0} fullWidth/>
                    </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
)


{/*const FinesTitle = ({ record }) => {
    return <span>PaidFines {record ? `${record.id}` : ''}</span>;
};*/}

export const FinesShow = (props) => (    
    <Edit actions={<ShowActions/>} {...props}>
               <TabbedShowLayout syncWithLocation={false}>
            <Tab label="Summary">
                    User: <ReferenceField source="users_id" reference="users" link={false}><TextField source="first_name" /></ReferenceField>
                    Loan Id: <NumberField source="loan_id"  min={0} fullWidth/>
                    Description: <TextField source="description" fullWidth/>
                    Final Amount: <NumberField source="final_amount"  min={0} fullWidth/>
                    Paid: <TextField source="is_paid" fullWidth/>
        </Tab>
        </TabbedShowLayout>
    </Edit>
);