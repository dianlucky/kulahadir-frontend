import {
  useCreateAccount,
  useDeleteAccount,
} from "@/features/admin/pages/DataMaster/Account";
import { useCreateEmployee } from "@/features/admin/pages/DataMaster/Employee";
import { AccountType, EmployeeType } from "@/types";
import {
  Button,
  Divider,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconUser } from "@tabler/icons-react";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";

export const FormAddEmployee: React.FC = () => {
  const navigate = useNavigate();

  // CREATE ACCOUNT
  const formAccount = useForm({
    validateInputOnChange: true,
    initialValues: {
      username: "",
      password: "",
      level: "",
      status: "",
    },
    validate: {
      username: (value) => (value.length < 5 ? "Minimal 10 karakter" : null),
      password: (value) => (value.length < 10 ? "Minimal 10 karakter" : null),
    },
  });

  const mutationCreateAccount = useCreateAccount();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = formAccount.validate();
    if (validation.hasErrors) return;

    const accountData = {
      username: formAccount.values.username,
      password: formAccount.values.password,
      level: formAccount.values.level,
      status: formAccount.values.status,
    };

    try {
      const data = await mutationCreateAccount.mutateAsync(accountData);
      console.log("✅ Create account success:", data);
      formAccount.reset();

      if (!data.data.id) {
        console.error("❌ Account ID tidak ditemukan dalam response:", data);
        return;
      }

      await handleCreateEmployee(data.data.id);
    } catch (error) {
      console.error("❌ Create account gagal:", error);
    }
  };

  //   END FOR CREATE ACCOUNT

  // DELETE ACCOUNT
  const deleteAccountMutation = useDeleteAccount();
  const deleteAccount = async (id: number | undefined) => {
    deleteAccountMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        close();
      },
    });
  };
  // END OF DELETE ACCOUNT

  const formEmployee = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      birth_date: new Date(),
      phone: "",
    },
    validate: {
      name: (value) => (value.length < 10 ? "Minimal 10 karakter" : null),
      birth_date: (value) =>
        value instanceof Date && !isNaN(value.getTime())
          ? null
          : "Tanggal tidak valid",
      phone: (value) => (value.length < 11 ? "Minimal 11 karakter" : null),
    },
  });

  const mutationCreateEmployee = useCreateEmployee();
  const handleCreateEmployee = async (accountId: number) => {
    console.log(
      "🟡 Masuk ke handleCreateEmployee dengan accountId:",
      accountId
    );

    const validation = formEmployee.validate();
    if (validation.hasErrors) {
      deleteAccount(accountId);
      close();
      return;
    }

    const employeeData = {
      name: formEmployee.values.name,
      birth_date: formatISO(formEmployee.values.birth_date),
      phone: String(formEmployee.values.phone),
      account_id: accountId,
    };

    await mutationCreateEmployee.mutateAsync(employeeData, {
      onSuccess: (data: EmployeeType) => {
        console.log("✅ Employee created:", data);
        formEmployee.reset();
        navigate(-1);
        close();
      },
      onError: () => {
        console.error("❌ Gagal membuat employee, menghapus akun...");
        deleteAccount(accountId);
      },
    });
  };
  return (
    <>
      <section className="bg-white shadow-sm rounded-lg">
        <div className="flex justify-between py-2 px-5">
          <div>
            <Text fw={500} size="md">
              Form akun
            </Text>
          </div>
          <div>
            <IconUser />
          </div>
        </div>
        <div className="px-5">
          <Divider />
        </div>
        <form>
          <div className="px-5 pb-5">
            <div>
              <TextInput
                label="username"
                size="sm"
                key={formAccount.key("username")}
                {...formAccount.getInputProps("username")}
              />
            </div>
            <div>
              <TextInput
                label="password"
                size="sm"
                key={formAccount.key("password")}
                {...formAccount.getInputProps("password")}
              />
            </div>
            <div>
              <Select
                withAsterisk
                label="Role"
                placeholder="role"
                data={[
                  { value: "Admin", label: "Admin" },
                  { value: "Owner", label: "Owner" },
                  { value: "Pegawai", label: "Pegawai" },
                ]}
                {...formAccount.getInputProps("level")}
              />
            </div>
            <div>
              <Select
                withAsterisk
                label="Status"
                placeholder="status"
                mt={8}
                data={[
                  { value: "Pegawai tetap", label: "Pegawai tetap" },
                  { value: "Part time", label: "Part time" },
                  { value: "Owner", label: "Owner" },
                  { value: "Admin", label: "Admin" },
                ]}
                {...formAccount.getInputProps("status")}
              />
            </div>
          </div>
        </form>
      </section>
      <section className="bg-white shadow-sm rounded-lg mt-2 mb-20">
        <div className="flex justify-between py-2 px-5">
          <div>
            <Text fw={500} size="md">
              Form biodata
            </Text>
          </div>
          <div>
            <IconUser />
          </div>
        </div>
        <div className="px-5">
          <Divider />
        </div>
        <form onSubmit={handleSubmitForm}>
          <div>
            <div className="px-5 pb-5 mt-1">
              <div>
                <TextInput
                  label="Nama lengkap"
                  size="sm"
                  key={formEmployee.key("name")}
                  {...formEmployee.getInputProps("name")}
                />
              </div>
              <div>
                <NumberInput
                  hideControls
                  allowNegative={false}
                  label="No Whatsapp"
                  size="sm"
                  key={formEmployee.key("phone")}
                  {...formEmployee.getInputProps("phone")}
                />
              </div>
              <div>
                <DatePickerInput
                  label="Tanggal lahir"
                  key={formEmployee.key("birth_date")}
                  {...formEmployee.getInputProps("birth_date")}
                />
              </div>
              <div className="w-full mt-4">
                <Button fullWidth size="sm" type="submit">
                  Simpan pegawai
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
