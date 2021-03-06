// in src/users.js
import * as React from "react";
import { useMediaQuery } from "@material-ui/core";

import {
  useQuery,
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
  EditButton,
  ArrayField,
  DateField,
  DeleteButton,
  Create,
  Edit,
  SimpleList,
  SimpleForm,
  SelectInput,
  PasswordInput,
  useNotify,
  useRefresh,
  useRedirect,
  TextInput,
} from "react-admin";

export const UserList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="phoneNumber" />
          <ArrayField source="reports">
            <Datagrid>
              <TextField source="Reason" />
              <TextField source="details" />
            </Datagrid>
          </ArrayField>
          <ReferenceField source="role" reference="role">
            <TextField source="name" />
          </ReferenceField>
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};
export const UserCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const { data } = useQuery({
    type: "getList",
    resource: "role",
    payload: {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "DESC" },
      filter: {},
    },
  });

  if (!data) return null;

  const onFailure = (error) => {
    notify(`Could not create user: ${error.message}`);
    refresh();
  };
  const onSuccess = () => {
    notify(`Saved`);
    redirect("/user");
    refresh();
  };
  return (
    <Create onFailure={onFailure} onSuccess={onSuccess} {...props}>
      <SimpleForm>
        {/*   <RoleReferenceInput
                source="role"
                reference="admin"
                allowEmpty
                validate={required()}
                perPage={10000}
                sort={defaultSort}
            /> */}
        <SelectInput source="role" choices={data} />
        {/* <ReferenceInput source="role" reference="admin"
              sort={{ field: "name", order: "ASC" }}>
        <SelectInput optionText="admin.name" /> 
      </ReferenceInput> */}
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <PasswordInput source="repeatPassword" />
        <TextInput source="phoneNumber" />
        <SelectInput
          label="Gender"
          source="gender"
          choices={[
            { id: "Male", name: "Male" },
            { id: "Female", name: "Female" },
            { id: "Not specified", name: "Not specified" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};

export const UserEdit = (props) => {
  const { data } = useQuery({
    type: "getList",
    resource: "role",
    payload: {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "DESC" },
      filter: {},
    },
  });

  if (!data) return null;
  return (
    <Edit {...props}>
      <SimpleForm>
        {/*   <RoleReferenceInput
              source="role"
              reference="admin"
              allowEmpty
              validate={required()}
              perPage={10000}
              sort={defaultSort}
          /> */}
        <SelectInput source="role" choices={data} />
        {/* <ReferenceInput source="role" reference="admin"
            sort={{ field: "name", order: "ASC" }}>
      <SelectInput optionText="admin.name" /> 
    </ReferenceInput> */}
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <PasswordInput source="repeatPassword" />
        <TextInput source="phoneNumber" />
        <SelectInput
          label="Gender"
          source="gender"
          choices={[
            { id: "Male", name: "Male" },
            { id: "Female", name: "Female" },
            { id: "Not specified", name: "Not specified" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
