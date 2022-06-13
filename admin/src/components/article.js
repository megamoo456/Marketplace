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
  ImageField,
} from "react-admin";

const ArticleTitle = ({ record }) => {
  return <span>Article {record ? `"${record.title}"` : ""}</span>;
};

export const ArticleList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} title={<ArticleTitle />}>
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
          <TextField source="description" />
          <ImageField source="image" />
          <DateField source="addedAt" />
            <Datagrid>
              <TextField source="tags" />
            </Datagrid>
          <ReferenceField source="articleowner"  reference="user">
                        <TextField source="name" />
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

