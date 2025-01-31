import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';

import { useLogin } from '../api';

export const LoginForm: React.FC = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { username: '', password: '' },
    validate: {
      username: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
      password: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    },
  });
  const loginMutation = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await loginMutation.mutateAsync(
      { data: form.values },
      {
        onError: ({ response, message }) => {
          if (response?.data.errors) {
            form.setErrors(response.data.errors);
          } else {
            notifications.show({
              message: JSON.parse(response?.request.response).status ?? message ?? 'Error',
              color: 'red',
            });
          }
        },
        onSuccess: (data) => {
          console.log(data);
          queryClient.setQueryData(['creds'], data.creds);
          storage.setToken(data.token);
          navigate('/');
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInput
          name="username"
          placeholder="username"
          leftSection={<IconAt size={14} />}
          {...form.getInputProps('username')}
        />
      </div>
      <div className="mb-2">
        <PasswordInput
          name="password"
          placeholder="**********"
          leftSection={<IconLock size={14} />}
          {...form.getInputProps('password')}
        />
      </div>

      <Button className="mt-8" type="submit" fullWidth loading={loginMutation.isPending}>
        Login
      </Button>
    </form>
  );
};
