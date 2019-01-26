'use strict';

module.exports = function(app) {
    /*
     * The `app` object provides access to a variety of LoopBack resources such as
     * models (e.g. `app.models.YourModelName`) or data sources (e.g.
     * `app.datasources.YourDataSource`). See
     * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
     * for more info.
     */
    var User = app.models.Administrator;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var ACL = app.models.ACL;
    User.findOrCreate({
            name: 'administrator',
            email: 'admin@bunnys.com',
            username: 'admin',
            password: '12345'
        },
        function(err, succ) {
            if (err) {} else {
              console.log('admin created');
                Role.create({
                        name: 'superUser'
                    },
                    function(createRoleError, createRole) {
                      console.log('role created');
                        createRole.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: succ.id
                        },function(err,s){
                          if(!err) {
                            console.log('role assigned.')
                          }
                        });
                    }
                );
            }
        }
    );
};
