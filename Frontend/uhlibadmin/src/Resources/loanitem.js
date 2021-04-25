import * as React from "react";
import { List, Datagrid, TextField, DateField, NumberField, ReferenceField, ReferenceInput, TextInput, SimpleForm, Edit, NumberInput, SelectInput, BooleanInput,DateTimeInput, Create,Filter, Show, SimpleShowLayout, AutocompleteInput } from 'react-admin';
import {Actions, MyBooleanfield} from "./helper";
import { TopToolbar, ShowButton, ListButton, EditButton} from 'react-admin';
import {Grid} from '@material-ui/core'
const LoanitemFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Search by Transaction_id" source="transaction_id" reference="transactions" alwaysOn>
            <TextInput  optionText="transaction_id" resettable  />
        </ReferenceInput>
        {/* <NumberInput label="search by item_id" source="item_id" alwaysOn/> */}
        <ReferenceInput label="Search by item title" source="item_id" reference="items" allowEmpty>
            <AutocompleteInput optionText="title" resettable />
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

const CreateActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const LoanitemList = props => (
    <List filters={<LoanitemFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="item_id" label="item_id"/>
            <ReferenceField source="item_id" reference="items"><TextField source="title" /></ReferenceField>
            {/* <NumberField source="quantity" /> */}
            <TextField source="transaction_id" />
            <MyBooleanfield source="is_due" />
            <DateField source="date_due" showTime/>
            <DateField source="created_at" showTime/>
            <DateField source="updated_at" showTime/>
            {/* <TextField source="created_by" />
            <TextField source="updated_by" /> */}
        </Datagrid>
    </List>
);



export const LoanitemEdit = props => (
    <Edit actions={<EditActions/>} {...props}>
        <SimpleForm >
            <Grid container spacing={1} style={{width:"100%"}}>
                <Grid item xs={6}>
                    <ReferenceInput  source="transaction_id" reference="transactions">
                        <TextInput  optionText="transaction_id" fullWidth/>
                    </ReferenceInput >
                    <NumberInput source="item_id"/>
                    <ReferenceInput source="item_id" reference="items" >
                        <AutocompleteInput disabled optionText="title" fullWidth/>
                    </ReferenceInput>
                </Grid>
                <Grid item xs={6}>

                    <BooleanInput source="is_due" fullWidth/>
                    {/* <NumberInput source="quantity" min={0} fullWidth/><br></br> */}
                    <DateTimeInput disabled source="updated_at" showTime />
                    <DateTimeInput disabled source="created_at" showTime/>
                </Grid>
            </Grid>
           
        </SimpleForm>
    </Edit>
);



export const LoanitemCreate = props => (
    <Create actions={<CreateActions/>} {...props}>
        <SimpleForm>
            <ReferenceInput  source="transaction_id" reference="transactions">
                <AutocompleteInput  optionText="transaction_id" />
            </ReferenceInput >
            {/* <ReferenceInput source="item_id" reference="items" >
                <AutocompleteInput optionText="title"/>
            </ReferenceInput> */}
            <NumberInput source="item_id"/>
            <BooleanInput source="is_due" />
            {/* <NumberInput source="quantity" min={0} /> */}
            <DateTimeInput disabled source="created_at" />
            <DateTimeInput disabled source="updated_at" />
        </SimpleForm>
    </Create>
);


export const LoanitemShow = props =>{
    return <Show actions={<ShowActions/>}  {...props}>
    <SimpleShowLayout>
    <NumberField source="id"/>
            <NumberField source="item_id" label="item_id"/>
            {/* <NumberField source="quantity" /> */}
            <ReferenceField source="item_id" reference="items">
                <TextField source="title" />
            </ReferenceField>
            <TextField source="transaction_id" />
            <NumberField source="is_due" />
            <DateField source="date_due" showTime/>
            <DateField source="created_at" showTime/>
            <DateField source="updated_at" showTime/>
    </SimpleShowLayout>
</Show>
}