import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  SimpleList,
  ArrayField,
} from "react-admin";

export const OfferList = (props) => {
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
        <Datagrid>
          <ArrayField source="items">
            <Datagrid>
              <TextField source="title" />
              <TextField source="itemTotal" />
              <TextField source="phoneNumber" />
            </Datagrid>
          </ArrayField>
          <ReferenceField source="owner" reference="user">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="seller" reference="user">
            <TextField source="name" />
          </ReferenceField>
              <ReferenceField source="transporter" reference="user">
                <TextField source="name" />
              </ReferenceField>

          <TextField source="adress.shipping" />
          <TextField source="subtotal" />
          <TextField source="statue" />
        </Datagrid>
      )}
    </List>
  );
};
