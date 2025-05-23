import { AccountType } from "@/types";
import {
  Button,
  CloseButton,
  Collapse,
  Divider,
  Loader,
  Notification,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  useCreateAccount,
  useDeleteAccount,
  useGetAllAccount,
  useUpdateAccountById,
} from "../api";
import { IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

type UpdateAccountRequest = {
  username?: string;
  password?: string;
  level_id?: number;
};

export const AccountPage: React.FC = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isDetail, setDetail] = useState(false);
  const [account, setAccount] = useState<AccountType>();
  console.log("Account yang dipilih : ", account);

  useEffect(() => {
    if (account) {
      formUpdate.setValues({
        username: account.username ?? "",
        password: account.password ?? "",
        level_id: account.level_id?.toString() ?? "",
      });
    }
  }, [account]);

  // GET ACCOUNT
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const {
    data: DataAccounts,
    refetch: RefectchAccounts,
    isLoading: LoadingAccounts,
  } = useGetAllAccount();
  useEffect(() => {
    if (DataAccounts) {
      setAccounts(DataAccounts);
    }
  }, [DataAccounts]);
  //   console.log("Data akun:", accounts);

  const rows = accounts.map((account, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{account.username}</Table.Td>
      <Table.Td>{account.level.name}</Table.Td>
      <Table.Td className="w-40 ">
        <div className="flex gap-1 justify-center">
          <Button
            size="xs"
            color="indigo"
            onClick={() => {
              setDetail(true);
              setEdit(false);
              setDelete(false);
              setAccount(account);
            }}
          >
            <IconInfoCircle />
          </Button>
          <Button
            size="xs"
            color="yellow"
            onClick={() => {
              setEdit(true);
              setDetail(false);
              setDelete(false);
              setAccount(account);
            }}
          >
            <IconPencil />
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => {
              setDelete(true);
              setEdit(false);
              setDetail(false);
              setAccount(account);
            }}
          >
            <IconTrash />
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  // END OF GET ACCOUNT

  // CREATE ACCOUNT
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      username: "",
      password: "",
      level_id: "",
    },
    validate: {
      username: (value) => (value.length < 5 ? "Minimal 10 karakter" : null),
      password: (value) => (value.length < 10 ? "Minimal 10 karakter" : null),
    },
  });
  const mutationCreateAccount = useCreateAccount();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.isValid()) return;

    const accountData = {
      username: form.values.username,
      password: form.values.password,
      level_id: parseInt(form.values.level_id),
    };

    await mutationCreateAccount.mutateAsync(accountData, {
      onSuccess: (data: AccountType) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        form.reset();
        RefectchAccounts();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END OF CREATE ACCOUNT

  // UPDATE ACCOUNT
  const formUpdate = useForm({
    validateInputOnChange: true,
    initialValues: account ?? {
      username: "",
      password: "",
      level_id: "",
    },
    validate: {
      username: (value) => (value.length < 5 ? "Minimal 10 karakter" : null),
    },
  });
  const mutationUpdateAccount = useUpdateAccountById(account?.id);
  const handleUpdateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // if (!form.isValid()) return;

    const updateAccountData: UpdateAccountRequest = {
      username: formUpdate.values.username,
      level_id: parseInt(formUpdate.values.level_id.toString()),
    };

    if ((formUpdate.values.password ?? "").trim() !== "") {
      updateAccountData.password = formUpdate.values.password;
    }

    await mutationUpdateAccount.mutateAsync(updateAccountData, {
      onSuccess: (data: AccountType) => {
        console.log("Success:", data);
        setSuccessUpdate(true);
        formUpdate.reset();
        RefectchAccounts();
        close();

        setTimeout(() => {
          setSuccessUpdate(false);
        }, 4500);
      },
    });
  };
  // END OF UPDATE ACCOUNT

  // DELETE ACCOUNT
  const deleteAccountMutation = useDeleteAccount();
  const deleteAccount = async (id: number | undefined) => {
    deleteAccountMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        setSuccessDelete(true);
        setDelete(false);
        RefectchAccounts();
        close();
        setTimeout(() => {
          setSuccessDelete(false);
        }, 4500);
      },
    });
  };
  // END OF DELETE ACCOUNT

  if (LoadingAccounts) {
    return <Loader color="blue" type="dots" />;
  }

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="col-span-9">
          <section className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex">
              <div>
                <div className="text-dark font-semibold cursor-pointer text-lg">
                  Daftar akun
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Table
                striped
                highlightOnHover
                withTableBorder
                withColumnBorders
                className="text-dark font-semibold cursor-pointer text-sm"
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="font-semibold">No</Table.Th>
                    <Table.Th className="font-semibold">Username</Table.Th>
                    <Table.Th className="font-semibold">Role</Table.Th>
                    <Table.Th className="font-semibold flex justify-center">
                      Aksi
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </div>
          </section>
        </div>
        <div className="col-span-3">
          <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg">
            <div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                  Tambah akun
                </div>
                <div className="col-span-2 -mt-1">
                  <Button
                    color="blue"
                    className="shadow-lg"
                    size="xs"
                    onClick={toggle}
                  >
                    <IconPencil size={20} color="black" />
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="mt-2">
                <Collapse in={opened}>
                  <form onSubmit={handleSubmitForm}>
                    <TextInput
                      withAsterisk
                      label="Username"
                      className="mb-4"
                      placeholder="username"
                      key={form.key("username")}
                      {...form.getInputProps("username")}
                    />
                    <TextInput
                      withAsterisk
                      label="Password"
                      className="mb-4"
                      placeholder="password"
                      key={form.key("password")}
                      {...form.getInputProps("password")}
                    />
                    <Select
                      withAsterisk
                      label="Role"
                      placeholder="role"
                      data={[
                        { value: "1", label: "Admin" },
                        { value: "2", label: "Owner" },
                        { value: "3", label: "Pegawai" },
                      ]}
                      {...form.getInputProps("level_id")}
                    />
                    <div className="flex justify-center mt-5">
                      <Button fullWidth type="submit">
                        Simpan
                      </Button>
                    </div>
                  </form>
                </Collapse>
              </div>
            </div>
          </section>
          {isDelete ? (
            <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                    Hapus tugas
                  </div>
                  <CloseButton
                    onClick={() => setDelete(false)}
                    className="col-span-2 flex left-1"
                  ></CloseButton>
                </div>
                <Divider />
                <div className="mt-4 text-center">
                  <Text size="md" fw={500}>
                    Apakah anda yakin ingin menghapus data akun dengan username
                    ?
                  </Text>
                  <Text size="md" c={"red"} fw={600}>
                    "{account?.username}"
                  </Text>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={() => deleteAccount(account?.id)}
                    type="submit"
                    color="red"
                  >
                    Ya!
                  </Button>
                </div>
              </div>
            </section>
          ) : isEdit ? (
            <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                    Edit akun
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <CloseButton onClick={() => setEdit(false)}></CloseButton>
                  </div>
                </div>
                <Divider />
                <div className="mt-4">
                  <form onSubmit={handleUpdateAccount}>
                    <TextInput
                      label="Username"
                      className="mb-4"
                      placeholder="username"
                      key={formUpdate.key("username")}
                      {...formUpdate.getInputProps("username")}
                    />
                    <TextInput
                      label="Password"
                      className="mb-4"
                      placeholder="password"
                      key={formUpdate.key("password")}
                      {...formUpdate.getInputProps("password")}
                    />
                    <Select
                      label="Role"
                      placeholder="role"
                      data={[
                        { value: "1", label: "Admin" },
                        { value: "2", label: "Owner" },
                        { value: "3", label: "Pegawai" },
                      ]}
                      {...formUpdate.getInputProps("level_id")}
                    />
                    <div className="flex justify-center mt-5">
                      <Button fullWidth type="submit">
                        Simpan
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          ) : isDetail ? (
            <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                    Hapus tugas
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <CloseButton onClick={() => setDetail(false)}></CloseButton>
                  </div>
                </div>
                <Divider />
                <div className="mt-4 text-center">
                  <Text size="md" fw={500}>
                    Apakah anda yakin ingin menghapus data account ?
                  </Text>
                  <Text size="md" c={"red"} fw={600}>
                    "{account?.username}"
                  </Text>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={() => deleteAccount(account?.id)}
                    type="submit"
                    color="red"
                  >
                    Ya!
                  </Button>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50 w-100">
        {successAdd && (
          <Notification color="teal" title="Berhasil!" mt="md">
            Data berhasil ditambahkan
          </Notification>
        )}
        {successUpdate && (
          <Notification color="teal" title="Berhasil!" mt="md">
            Data berhasil diubah
          </Notification>
        )}
        {successDelete && (
          <Notification color="teal" title="Berhasil!" mt="md">
            Data berhasil dihapus
          </Notification>
        )}
      </div>
    </>
  );
};
