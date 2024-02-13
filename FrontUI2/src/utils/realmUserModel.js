import Realm from "realm";

class UserModel extends Realm.Object {}
UserModel.schema = {
    name: 'userInfo',
    properties: {
        id: 'int',
        email: 'string',
        password: 'string'
    },
};