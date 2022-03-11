const mongoose = require('mongoose');

const Permissions = require('./Permissions');

const roleSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        trim: true,
        required: 'Please fill the role name.'
    },
    permissions: {
      type: Object,
        enum: [Permissions.canCreateProduct ,
           Permissions.canEditProduct ,
           Permissions.canDeleteProduct,
           Permissions.canViewProduct,
           Permissions.canCreateBlog,
           Permissions.canMakeOffer,
           Permissions.canTransporter,
           Permissions.canCreateRole,
           Permissions.canEditRole,
           Permissions.canDeleteRole,  
           Permissions.canAffectRole  
          ] // Accept only these permissions

    }

});


module.exports = mongoose.model('Roles', roleSchema);
/* eslint-disable key-spacing */

/**
 * Role permissions enum
 * Shared between client and server side code base
 */
 /* const Roles = {
    transporter: 'Transporter',
    admin:     'Admin',
    user:      'Buyer & Seller',
  
    // eslint-disable-next-line object-shorthand
    map: () => {
      return [
        { value: Roles.user },
        { value: Roles.admin },
        { value: Roles.transporter }
      ];
    },
  
    isValidRole: (role) => {
      let valid = false;
      Roles.map().forEach((item) => {
        if (item.value === role) valid = true;
      });
      return valid;
    }
  };
  
  module.exports = Roles; */