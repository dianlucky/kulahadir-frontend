import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications, showNotification } from "@mantine/notifications";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { queryClient } from "@/lib/react-query";
import storage from "@/utils/storage";

import { useLogin } from "../api";

export const LoginForm: React.FC = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { username: "", password: "" },
    validate: {
      username: (value: string) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
      password: (value: string) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
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
          const status = response?.status;

          // Jika error 401 (Unauthorized)
          if (status === 401) {
            showNotification({
              message: "Username atau password salah",
              color: "red",
              position: "top-center",
            });
            return;
          }

          // Jika error dari validasi server (422, dsb.)
          if (response?.data.errors) {
            form.setErrors(response.data.errors);
          } else {
            notifications.show({
              message:
                JSON.parse(response?.request.response).status ??
                message ??
                "Error",
              color: "red",
            });
          }
        },
        onSuccess: (data) => {
          console.log(data);
          queryClient.setQueryData(["creds"], data.creds);
          storage.setToken(data.token);
          // showNotification({
          //   message: `Selamat datang ${data.creds.username}`,
          //   color: "green",
          //   position: "top-center",
          // });
          navigate("/");
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
          leftSection={<IconUser size={14} />}
          {...form.getInputProps("username")}
        />
      </div>
      <div className="mb-2">
        <PasswordInput
          name="password"
          placeholder="**********"
          leftSection={<IconLock size={14} />}
          {...form.getInputProps("password")}
        />
      </div>
      <div className="mt-7">
        <Button
          color="#654433"
          className="mt-8"
          type="submit"
          fullWidth
          loading={loginMutation.isPending}
        >
          Login
        </Button>
      </div>
    </form>
  );
};
