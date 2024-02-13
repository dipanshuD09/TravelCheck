import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Link} from 'react-router-native';
import {
  Avatar,
  Card,
  IconButton,
  ActivityIndicator,
  MD2Colors,
  Snackbar,
} from 'react-native-paper';
import {useGetListsQuery} from '../slices/listApiSlice';

const ListScreen = () => {
  const {data: lists, isLoading, error} = useGetListQuery();
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : error ? (
        <>
          {onToggleSnackBar}
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Ok',
            }}>
            {error?.data?.message || error.error}
          </Snackbar>
        </>
      ) : (
        <>
          {lists?.map(x => (
            <Link to={`/tasks/${list._id}`}>
              <Card.Title
                title={x.listTitle}
                subtitle={x.createdAt}
                left={props => <Avatar.Icon {...props} icon="folder" />}
                right={props => <IconButton {...props} icon="dots-vertical" />}
              />
            </Link>
          ))}
        </>
      )}
    </>
  );
};

export default ListScreen;
