import Realm from "realm";
import UserModel from './realmUserModel';

const realm = new Realm({ schema: [UserModel] });

const RealmUserService = {
  getAllUsers: () => realm.objects('User'),


  addUser: (userInfo) => {
    realm.write(() => {
      realm.create('userInfo', userInfo);
    });
  },

  deleteUser: () => {
      realm.write(() => {
        realm.deleteAll();
      });
  },
};

export default RealmUserService;