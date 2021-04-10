import * as React from "react";
import { List, Datagrid, TextField, DateField, NumberField, ReferenceField, ReferenceInput, TextInput, SimpleForm, Edit, NumberInput, SelectInput, BooleanInput,DateTimeInput, Create,Filter, Show, SimpleShowLayout, AutocompleteInput } from 'react-admin';
import { TopToolbar, ShowButton, ListButton} from 'react-admin';
import TrueIcon from '@material-ui/icons/Done'
import FalseIcon from '@material-ui/icons/Clear'

const LoanitemFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Search by Transaction_id" source="transaction_id" reference="transactions" allowEmpty>
            <SelectInput optionText="transaction_id" />
        </ReferenceInput>
        <NumberInput label="search by item_id" source="item_id" alwaysOn/>
    </Filter>
);
const MyBooleanfield = ({ record={}, source}) =>{
    if (record[source] === 1 ){
        return <div>
            <TrueIcon/> 
        </div>
    }
    else{
        return <div><FalseIcon/></div>
    }
}


const Actions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} label="Back"  />
    </TopToolbar>
);

export const LoanitemList = props => (
    <List filters={<LoanitemFilter/>} {...props}>
        <Datagrid rowClick="show">
            {/* <NumberField source="id"/> */}
            <ReferenceField source="item_id" reference="items"><TextField source="title" /></ReferenceField>
            <NumberField source="quantity" />
            <TextField source="transaction_id" />
            <MyBooleanfield source="is_due" />
            <DateField source="date_due" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            {/* <TextField source="created_by" />
            <TextField source="updated_by" /> */}
        </Datagrid>
    </List>
);



export const LoanitemEdit = props => (
    <Edit actions={<Actions/>} {...props}>
        <SimpleForm >
            <ReferenceInput  source="transaction_id" reference="transactions">
                <AutocompleteInput  optionText="transaction_id" />
            </ReferenceInput >
            <ReferenceInput source="item_id" reference="items" >
                <AutocompleteInput optionText="title"/>
            </ReferenceInput>
            <BooleanInput source="is_due" />
            <NumberInput source="quantity" />
            <DateTimeInput disabled source="date_created" />
            <DateTimeInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);



export const LoanitemCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput  source="transaction_id" reference="transactions">
                <AutocompleteInput  optionText="transaction_id" />
            </ReferenceInput >
            <ReferenceInput source="item_id" reference="items" >
                <AutocompleteInput optionText="title"/>
            </ReferenceInput>
            <BooleanInput source="is_due" />
            <NumberInput source="quantity" />
            <DateTimeInput disabled source="date_created" />
            <DateTimeInput disabled source="updated_at" />
        </SimpleForm>
    </Create>
);


export const LoanitemShow = props =>{
    return <Show {...props}>
    <SimpleShowLayout>
    <NumberField source="id"/>
            <NumberField source="item_id"/>
            <NumberField source="quantity" />
            <TextField source="transaction_id" />
            <NumberField source="is_due" />
            <DateField source="date_due" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
    </SimpleShowLayout>
</Show>
}