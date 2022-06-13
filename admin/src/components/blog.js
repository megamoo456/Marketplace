import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Create,
  SimpleList,
  Edit,
  SimpleForm,
  DeleteButton,
  TextInput,
  DateField,
  ReferenceField,
} from "react-admin";

const BlogTitle = ({ record }) => {
  return <span>Blog {record ? `"${record.title}"` : ""}</span>;
};

export const BlogList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} title={<BlogTitle />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="title" />
          <TextField source="sujet" />
          <DateField source="addedAt" />
          <ReferenceField source="articles"  reference="article">
                        <TextField source="title" />
          </ReferenceField>
    {/*       <ReferenceField source="articles" reference="role">
            <TextField source="name" />
          </ReferenceField>   */}     
            <EditButton /> 
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const BlogsCreate = (props) => {

  return (
    <Create {...props} title="Blog Create">
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="sujet" />
        {/*       <ReferenceInput source="permission" reference="admin">
        <SelectInput optionText="admin.permission" optionValue="admin.id" />
      </ReferenceInput> */}
      </SimpleForm>
    </Create>
  );
};
export const BlogEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="sujet" />
      </SimpleForm>
    </Edit>
  );
};
