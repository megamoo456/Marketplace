import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormSpy } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import RolePreview from './RolePreview';

import {
    crudGetMatching,
    ReferenceInput,
    SelectInput,
    useTranslate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import RoleQuickCreate from './RoleQuickCreate';

const useStyles = makeStyles({
    button: {
        margin: '10px 24px',
        position: 'relative',
    },
});

const RoleReferenceInput = props => {
    const translate = useTranslate();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);
    const [newRoleId, setNewRoleId] = useState('');

    useEffect(() => {
        //Refresh the choices of the ReferenceInput to ensure our newly created post
        // always appear, even after selecting another post
        dispatch(
            crudGetMatching(
                'admin',
                'comments@post_id',
                { page: 1, perPage: 25 },
                { field: 'id', order: 'DESC' },
                {}
            )
        );
    }, [dispatch, newRoleId]);

    const handleNewClick = useCallback(
        event => {
            event.preventDefault();
            setShowCreateDialog(true);
        },
        [setShowCreateDialog]
    );

    const handleShowClick = useCallback(
        event => {
            event.preventDefault();
            setShowPreviewDialog(true);
        },
        [setShowPreviewDialog]
    );

    const handleCloseCreate = useCallback(() => {
        setShowCreateDialog(false);
    }, [setShowCreateDialog]);

    const handleCloseShow = useCallback(() => {
        setShowPreviewDialog(false);
    }, [setShowPreviewDialog]);

    const handleSave = useCallback(
        admin => {
            setShowCreateDialog(false);
            setNewRoleId(admin.id);
        },
        [setShowCreateDialog, setNewRoleId]
    );

    return (
        <Fragment>
            <ReferenceInput {...props} defaultValue={newRoleId}>
                <SelectInput optionText="admin.name" />
            </ReferenceInput>
            <Button
                data-testid="button-add-Role"
                className={classes.button}
                onClick={handleNewClick}
            >
                {translate('ra.action.create')}
            </Button>
           
            <Dialog
                data-testid="dialog-add-Role"
                fullWidth
                open={showCreateDialog}
                onClose={handleCloseCreate}
                aria-label={translate('simple.create-Role')}
            >
                <DialogTitle>{translate('simple.create-Role')}</DialogTitle>
                <DialogContent>
                    <RoleQuickCreate
                        onCancel={handleCloseCreate}
                        onSave={handleSave}
                        basePath="/admin"
                        resource="admin"
                    />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default RoleReferenceInput;
