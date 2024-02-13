import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, Text, Button} from 'react-native-paper';
import {useLoginMutation} from '../slices/userApiSlice';

const MyComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector(state => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Text variant="headlineLarge">Login</Text>
      <Text variant="titleMedium">Email</Text>
      <TextInput
        mode="outlined"
        label="Outlined input"
        placeholder="Enter Email"
        right={<TextInput.Affix text="/100" />}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <Text variant="titleMedium">Password</Text>
      <TextInput
        label="Enter Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        mode="contained"
        onPress={() => {
          submitHandler;
        }}>
        Press me
      </Button>
    </>
  );
};

export default MyComponent;
