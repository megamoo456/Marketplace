import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Datagrid, TextField, ReferenceField ,
    SimpleList,
    ReferenceInput,
    SelectInput,
    TextInput} from 'react-admin';
    

const productFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="name" label="User" reference="product" allowEmpty>
        <SelectInput optionText="Title" />
    </ReferenceInput>,
];
export const ProductList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List  {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="title" />
                    <TextField source="category" />
                    <TextField source="description" />
                    <TextField source="price" />
                    <ReferenceField source="seller"  reference="user">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="city" />
                    <TextField source="addedAt" />
                    <TextField source="active" />
                </Datagrid>
            )}
        </List>
    );
}
