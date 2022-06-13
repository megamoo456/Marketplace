import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { List, Datagrid, TextField, EditButton ,
    Create,
    SimpleList,
    useQuery,
    Edit,
    CheckboxGroupInput,
    SimpleForm,
    DeleteButton,
    TextInput} from 'react-admin';
    
const RolesTitle = ({ record }) => {
    return <span>Role {record ? `"${record.title}"` : ''}</span>;
};

export const RoleList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} title={<RolesTitle/>}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="name" />
                    <TextField source="permissions" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            )}
        </List>
    );
}
export const RolesCreate = (props) => {
    const { data } = useQuery({
        type: 'getList',
        resource: "role",
        payload: {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'DESC' },
          filter: {},
        },
      });
     
      if (!data) return null;
    return (
      <Create {...props} title="Role Create">
    <SimpleForm>
    <TextInput source="name" />
    <CheckboxGroupInput source="permissions" choices={[
    { id: 'canCreateProduct', name: 'can-create-product' },
     {id: 'canEditProduct' ,  name: "can-edit-product"},
     {id: 'canDeleteProduct', name: "can-delete-Product"},
     {id: 'canViewProduct', name:   "can-view-Product"},
     {id: 'canCreateBlog', name:    "can-create-blog"},
     {id: 'canMakeOffer', name:     "can-make-offer"},
     {id: 'canTransporter', name:   "can-transporter"},
     {id: 'canCreateRole', name:    "can-create-role"},
     {id: 'canEditRole', name:      "can-edit-role"},
     {id: 'canDeleteRole', name:    "can-delete-role"},
     {id: 'canAffectRole', name:    "can-affect-role"},
     {id: 'canCreateArticle', name:    "can-create-article"},
     {id: 'canDeleteArticle', name:    "can-delete-article"},
     {id: 'canCommentArticle', name:    "can-comment-article"},
     {id: 'canLikeArticle', name:    "can-like-article"},
     {id: 'canEnterAdmin', name:    "can-enter-admin"}
]} />
{/*       <ReferenceInput source="permission" reference="admin">
        <SelectInput optionText="admin.permission" optionValue="admin.id" />
      </ReferenceInput> */}
    </SimpleForm>
  </Create>
    );
}
export const RoleEdit = (props) => {
    const { data } = useQuery({
        type: 'getList',
        resource: "role",
        payload: {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'DESC' },
          filter: {},
        },
      });
     
      if (!data) return null;
    return (
  <Edit {...props}>
    <SimpleForm>
    <TextInput source="name" />
    <CheckboxGroupInput source="permissions" choices={[
    { id: 'canCreateProduct', name: 'can-create-product' },
     {id: 'canEditProduct' ,  name: "can-edit-product"},
     {id: 'canDeleteProduct', name: "can-delete-Product"},
     {id: 'canViewProduct', name:   "can-view-Product"},
     {id: 'canCreateBlog', name:    "can-buy-blog"},
     {id: 'canMakeOffer', name:     "can-make-offer"},
     {id: 'canTransporter', name:   "can-transporter"},
     {id: 'canCreateRole', name:    "can-create-role"},
     {id: 'canEditRole', name:      "can-edit-role"},
     {id: 'canDeleteRole', name:    "can-delete-role"},
     {id: 'canAffectRole', name:    "can-affect-role"},
     {id: 'canEnterAdmin', name:    "can-enter-admin"}
]} />
    </SimpleForm>
  </Edit>
    );
  }