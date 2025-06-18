import { AccountType, EmployeeType } from "@/types";
import { format, formatISO } from "date-fns";
import { id } from "date-fns/locale";
import {
  Button,
  CloseButton,
  Collapse,
  Divider,
  Image,
  Loader,
  Notification,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  useCreateEmployee,
  useDeleteEmployee,
  useGetAllEmployee,
  useUpdateEmployeeById,
} from "../api";
import { IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { useGetAllAccount } from "../../Account";

type UpdateEmployeeRequest = {
  name?: string;
  birth_date?: Date | string;
  phone?: string;
  account_id?: number;
};

export const EmployeePage: React.FC = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isDetail, setDetail] = useState(false);
  const [employee, setEmployee] = useState<EmployeeType>();
  console.log("Account yang dipilih : ", employee);

  useEffect(() => {
    if (employee) {
      formUpdate.setValues({
        name: employee.name ?? "",
        birth_date: new Date(employee.birth_date) ?? "",
        phone: employee.phone?.toString() ?? "",
        account_id: employee.account_id?.toString() ?? "",
      });
    }
  }, [employee]);

  //   GET ACCOUNT
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const { data: DataAccounts } = useGetAllAccount();
  useEffect(() => {
    if (DataAccounts) {
      setAccounts(DataAccounts);
    }
  }, [DataAccounts]);

  const selectAccounts = accounts.map((account) => ({
    value: account.id.toString(),
    label: account.username,
  }));
  // END FOR GET ACCOUNT

  // GET EMPLOYEE
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const {
    data: DataEmployees,
    refetch: RefetchEmployees,
    isLoading: LoadingEmployees,
  } = useGetAllEmployee();
  useEffect(() => {
    if (DataEmployees) {
      setEmployees(DataEmployees);
    }
  }, [DataEmployees]);
  //   console.log("Data akun:", accounts);

  const rows = employees.map((employee, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{employee.name}</Table.Td>
      {/* <Table.Td>
        {" "}
        {format(new Date(employee.birth_date), "d MMMM yyyy", {
          locale: id,
        })}{" "}
      </Table.Td> */}
      <Table.Td>{employee.phone}</Table.Td>
      <Table.Td>{employee.account.status}</Table.Td>
      <Table.Td>{employee.account.level}</Table.Td>
      <Table.Td className="w-40 ">
        <div className="flex gap-1 justify-center">
          <Button
            size="xs"
            color="indigo"
            onClick={() => {
              setDetail(true);
              setEdit(false);
              setDelete(false);
              setEmployee(employee);
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
              setEmployee(employee);
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
              setEmployee(employee);
            }}
          >
            <IconTrash />
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  // END OF GET EMPLOYEE

  // CREATE EMPLOYEE
  const formCreate = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      birth_date: new Date(),
      phone: "",
      account_id: "",
    },
    validate: {
      name: (value: string) =>
        value.length < 10 ? "Minimal 10 karakter" : null,
      birth_date: (value: Date) =>
        value instanceof Date && !isNaN(value.getTime())
          ? null
          : "Tanggal tidak valid",
      phone: (value: string) =>
        value.length < 11 ? "Minimal 11 karakter" : null,
    },
  });
  const mutationCreateEmployee = useCreateEmployee();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formCreate.isValid()) return;

    const employeeData = {
      name: formCreate.values.name,
      birth_date: formatISO(formCreate.values.birth_date),
      phone: formCreate.values.phone,
      account_id: parseInt(formCreate.values.account_id),
    };

    await mutationCreateEmployee.mutateAsync(employeeData, {
      onSuccess: (data: EmployeeType) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        formCreate.reset();
        RefetchEmployees();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END OF CREATE EMPLOYEE

  // UPDATE EMPLOYEE
  const formUpdate = useForm({
    validateInputOnChange: true,
    initialValues: employee ?? {
      name: "",
      birth_date: new Date(),
      phone: "",
      account_id: "",
    },
    validate: {
      name: (value: string) => (value.length < 8 ? "Minimal 8 karakter" : null),
      phone: (value: string) =>
        value.length < 11 ? "Minimal 11 karakter" : null,
    },
  });
  const mutationUpdateEmployee = useUpdateEmployeeById(employee?.id);
  const handleUpdateEmployee = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!formUpdate.isValid()) return;

    const updateAccountData: UpdateEmployeeRequest = {
      name: formUpdate.values.name,
      birth_date: formatISO(formUpdate.values.birth_date),
      phone: formUpdate.values.phone,
      account_id: parseInt(formUpdate.values.account_id.toString()),
    };

    await mutationUpdateEmployee.mutateAsync(updateAccountData, {
      onSuccess: (data: EmployeeType) => {
        console.log("Success:", data);
        setSuccessUpdate(true);
        formUpdate.reset();
        RefetchEmployees();
        close();

        setTimeout(() => {
          setSuccessUpdate(false);
        }, 4500);
      },
    });
  };
  // END OF UPDATE EMPLOYEE

  // DELETE EMPLOYEE
  const deleteEmployeeMutation = useDeleteEmployee();
  const deleteEmployee = async (id: number | undefined) => {
    deleteEmployeeMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        setSuccessDelete(true);
        setDelete(false);
        RefetchEmployees();
        close();
        setTimeout(() => {
          setSuccessDelete(false);
        }, 4500);
      },
    });
  };
  // END OF DELETE EMPLOYEE

  if (LoadingEmployees) {
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
                  Daftar pegawai
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
                    <Table.Th className="font-semibold">Nama</Table.Th>
                    <Table.Th className="font-semibold">No. Whatsapp</Table.Th>
                    <Table.Th className="font-semibold">Status</Table.Th>
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
                  Tambah pegawai
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
                      label="Nama"
                      placeholder="Nama lengkap"
                      key={formCreate.key("name")}
                      {...formCreate.getInputProps("name")}
                    />
                    <DatePickerInput
                      label="Tanggal lahir"
                      placeholder="Pick date"
                      key={formCreate.key("birth_date")}
                      {...formCreate.getInputProps("birth_date")}
                      onChange={(value) => {
                        if (value)
                          formCreate.setFieldValue("birth_date", value);
                      }}
                    />
                    <TextInput
                      withAsterisk
                      label="No. Whatsapp"
                      placeholder="No Whatsapp"
                      key={formCreate.key("phone")}
                      {...formCreate.getInputProps("phone")}
                    />
                    <Select
                      withAsterisk
                      label="Akun yang digunakan"
                      placeholder="Akun"
                      data={selectAccounts}
                      {...formCreate.getInputProps("account_id")}
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
                    Hapus data pegawai
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <CloseButton onClick={() => setDelete(false)}></CloseButton>
                  </div>
                </div>
                <Divider />
                <div className="mt-4 text-center">
                  <Text size="md" fw={500}>
                    Apakah anda yakin ingin menghapus data pegawai dengan nama ?
                  </Text>
                  <Text size="md" c={"red"} fw={600}>
                    "{employee?.name}"
                  </Text>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={() => deleteEmployee(employee?.id)}
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
                    Edit data pegawai
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <CloseButton onClick={() => setEdit(false)}></CloseButton>
                  </div>
                </div>
                <Divider />
                <div className="mt-4">
                  <form onSubmit={handleUpdateEmployee}>
                    <TextInput
                      withAsterisk
                      label="Nama"
                      placeholder="nama lengkap"
                      key={formUpdate.key("name")}
                      {...formUpdate.getInputProps("name")}
                    />
                    <DatePickerInput
                      label="Tanggal lahir"
                      placeholder="Pick date"
                      key={formUpdate.key("birth_date")}
                      {...formUpdate.getInputProps("birth_date")}
                      onChange={(value) => {
                        if (value)
                          formUpdate.setFieldValue("birth_date", value);
                      }}
                    />
                    <TextInput
                      withAsterisk
                      label="No. Whatsapp"
                      placeholder="No Whatsapp"
                      key={formUpdate.key("phone")}
                      {...formUpdate.getInputProps("phone")}
                    />
                    <Select
                      withAsterisk
                      label="Akun yang digunakan"
                      placeholder="Akun"
                      searchable
                      data={selectAccounts}
                      {...formUpdate.getInputProps("account_id")}
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
            <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2 mb-10">
              <div className="grid grid-cols-12">
                <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                  Detail pegawai
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1">
                  <CloseButton onClick={() => setDetail(false)}></CloseButton>
                </div>
              </div>
              <Divider />
              <div className="mt-4">
                <div className="grid grid-cols-12">
                  <div className="col-span-4 flex justify-center -ml-5">
                    <Image
                      radius="200"
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-span-8">
                    <div className="mt-2">
                      <Text fw={"bold"} size="lg" truncate="end">
                        {employee?.name}
                      </Text>
                    </div>
                    <div className="-mt-2">
                      <Text>{employee?.account.level}</Text>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 px-2">
                  <div className="col-span-6">
                    <div className="mt-5">
                      <Text>Username:</Text>
                      <Text fw={"bold"} mt={-5}>
                        {employee?.account.username}
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="mt-5">
                      <Text>Role:</Text>
                      <Text fw={"bold"} mt={-5}>
                        {employee?.account.level}
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="mt-5">
                      <Text>Status:</Text>
                      <Text fw={"bold"} mt={-5}>
                        {employee?.account.status}
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="mt-5">
                      <Text>No Whatsapp:</Text>
                      <Text fw={"bold"} mt={-5}>
                        {employee?.phone}
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="mt-5">
                      <Text>Tanggal lahir:</Text>
                      <Text fw={"bold"} mt={-5}>
                        {employee?.birth_date &&
                          format(
                            new Date(employee.birth_date),
                            "EEEE, dd MMMM yyyy",
                            { locale: id }
                          )}
                      </Text>
                    </div>
                  </div>
                </div>
                <Divider mt={7} />
                <div className="mt-2 px-2 flex gap-2">
                  <Text fw={400} size="sm">
                    Tgl dibuat :
                  </Text>
                  <Text fw={700} size="sm">
                    {employee?.created_at &&
                      format(
                        new Date(employee.created_at),
                        "EEEE, dd MMMM yyyy",
                        { locale: id }
                      )}
                  </Text>
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
