import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    CheckboxGroupInput,
    CREATE,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
    required,
    showNotification,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import CancelButton from './RoleQuickCreateCancelButton';

// We need a custom toolbar to add our custom buttons
// The CancelButton allows to close the modal without submitting anything
const PostQuickCreateToolbar = ({ submitting, onCancel, ...props }) => (
    <Toolbar {...props} disableGutters>
        <SaveButton />
        <CancelButton onClick={onCancel} />
    </Toolbar>
);

PostQuickCreateToolbar.propTypes = {
    submitting: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
    form: { padding: 0 },
});

const RoleQuickCreate = ({ onCancel, onSave, ...props }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const submitting = useSelector(state => state.admin.loading > 0);

    const handleSave = useCallback(
        values => {
            dispatch({
                type: 'QUICK_CREATE',
                payload: { data: values },
                meta: {
                    fetch: CREATE,
                    resource: 'auth/login',
                    onSuccess: {
                        callback: ({ payload: { data } }) => onSave(data),
                    },
                    onFailure: {
                        callback: ({ error }) => {
                            dispatch(showNotification(error.message, 'error'));
                        },
                    },
                },
            });
        },
        [dispatch, onSave]
    );

    return (
        <SimpleForm
            save={handleSave}
            saving={submitting}
            redirect={false}
            toolbar={
                <PostQuickCreateToolbar
                    onCancel={onCancel}
                    submitting={submitting}
                />
            }
            classes={{ form: classes.form }}
            {...props}
        >
            <TextInput source="name" validate={required()} />
            <CheckboxGroupInput source="permission" choices={[
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
     {id: 'canAffectRole', name:    "can-affect-role"}
]} />
       
        </SimpleForm>
    );
};

RoleQuickCreate.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default RoleQuickCreate;
