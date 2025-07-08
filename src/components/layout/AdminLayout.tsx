import {
  AppShell,
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  Button,
  Indicator,
  Divider,
  Text,
  Image,
  Modal,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconLogout, IconBell, IconChevronRight } from "@tabler/icons-react";
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { LoadingScreen } from "../elements";
import { SegmentControl } from "../navigation";
import { useAuth } from "@/features/auth";
import { NotificationType } from "@/types";
import {
  useDeleteNotification,
  usegetNotification,
  useUpdateReadNotification,
} from "@/features/employee/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { showNotification } from "@mantine/notifications";

type UpdateWasReaded = {
  was_read: boolean;
};
// ====================================================================================
// ================== THIS LAYOUT FOR ADMIN ONLY (SINGLE ROLE) =======================
// ====================================================================================
export const AdminLayout: React.FC = () => {
  const { creds, logout } = useAuth();

  const isMobile = useMediaQuery("(max-width: 800px)");
  const isTablet = useMediaQuery("(max-width: 1000px)");
  const [opened, { open, close: closeModal }] = useDisclosure(false);

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationType>();
  // console.log(selectedNotification)

  // GET NOTIFICATION
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data: DataNotification } = usegetNotification(creds?.employee_id);
  useEffect(() => {
    if (DataNotification) {
      setNotifications(DataNotification);
    } else {
      setNotifications([]);
    }
  }, [DataNotification]);
  // END FOR GET NOTIFICATION

  // HANDLE WAS READED
  const mutationWasReaded = useUpdateReadNotification(selectedNotification?.id);
  const dataUpdate: UpdateWasReaded = {
    was_read: true,
  };
  const handleWasRead = async () => {
    await mutationWasReaded.mutateAsync(dataUpdate, {
      onSuccess: (data: NotificationType) => {
        console.log("Success:", data);
        closeModal();
      },
    });
  };
  // END FOR HANDLE WAS READED

  // HANDLE DELETE NOTIFICATION
  const deleteNotificationMutation = useDeleteNotification();
  const handleDeleteNotification = async (id: number | undefined) => {
    deleteNotificationMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        showNotification({
          message: "Berhasil menghapus notifikasi",
          color: "green",
          position: "bottom-left",
        });
        closeModal();
      },
    });
  };
  // END FOR HANDLE DELETE NOTIFICATION

  if (isMobile || isTablet) {
    return (
      <div className="bg-blue-600 min-h-screen text-white flex justify-center items-center text-lg text-center p-20">
        <div>
          <div>Halaman Admin hanya bisa diakses Melalui Layar Laptop</div>
          <Button
            className="mt-3"
            color="blue"
            variant="white"
            onClick={() => logout()}
          >
            Kembali Ke Halaman Login
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 0,
          breakpoint: "sm",
        }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header className="shadow-md">
          <Group
            w="100%"
            h="100%"
            justify="space-between"
            gap={0}
            className="px-3"
          >
            <Group
              gap={5}
              justify={isMobile ? "end" : "center"}
              style={{ width: 240 }}
              className="h-full"
            >
              <div className="flex gap-2 items-center">
                <>
                  <div className="text-sm font-bold uppercase text-slate-400 text-center ">
                    Kulakita
                  </div>
                </>
              </div>
            </Group>

            <>{!isTablet && <SegmentControl />}</>

            {/* Profile and Name Information */}
            {!isTablet && (
              <Group className="h-full" justify="space-between">
                <Group gap={5} className="h-full -mr-10" justify="end">
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <UnstyledButton>
                        <Group gap={16} px={20}>
                          <div className="text-sm text-end">
                            <div className="font-semibold">
                              {creds?.username}
                            </div>
                            <div className="text-xs -mt-1 text-slate-400 capitalize">
                              Admin
                            </div>
                          </div>
                          <Avatar
                            src={"/images/profile-default.png"}
                            alt={"User"}
                            radius="xl"
                            size={33}
                          />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Menu</Menu.Label>

                      <Menu.Item
                        onClick={() => logout()}
                        color="red"
                        leftSection={<IconLogout size={14} />}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Group className="h-full" justify="end">
                  <Menu shadow="xl" width={500}>
                    <Menu.Target>
                      <UnstyledButton>
                        <Group gap={16} px={20}>
                          <Indicator
                            inline
                            disabled={
                              notifications.filter((data) => data.was_read)
                                .length != 0
                            }
                            processing
                            color="red"
                            size={10}
                            offset={3}
                          >
                            <IconBell size={26} />
                          </Indicator>
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Notifikasi</Menu.Label>
                      <Divider />
                      {notifications.filter((data) => data.was_read == false)
                        .length != 0 && (
                        <div className="mb-2 px-3">
                          <Divider
                            my="xs"
                            label="Belum dibaca"
                            labelPosition="left"
                          />
                          {notifications
                            .filter((data) => data.was_read == false)
                            .sort(
                              (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                            )
                            .map((data, index) => (
                              <button
                                className="bg-white shadow-xs rounded-xs"
                                onClick={() => {
                                  open(), setSelectedNotification(data);
                                }}
                                style={{ marginTop: "4px" }}
                                key={index}
                              >
                                <div className="grid grid-cols-12 py-5 px-4">
                                  <div className="col-span-1">
                                    <IconBell size={27} />
                                  </div>
                                  <div className="col-span-1">
                                    <div className="w-px h-full bg-gray-300 mx-4" />
                                  </div>
                                  <div className="col-span-9 mx-auto text-left">
                                    <Text
                                      fw={"bold"}
                                      size="14px"
                                      lineClamp={2}
                                      c={"#222831"}
                                    >
                                      {data.message}
                                    </Text>
                                  </div>
                                  <div className="col-span-1">
                                    <IconChevronRight color="#654433" />
                                  </div>
                                </div>
                              </button>
                            ))}
                        </div>
                      )}
                      {notifications.filter((data) => data.was_read == true)
                        .length != 0 && (
                        <div className="mb-2 px-3">
                          <Divider
                            my="xs"
                            label="Sudah dibaca"
                            labelPosition="left"
                          />
                          {notifications
                            .filter((data) => data.was_read == true)
                            .map((data, index) => (
                              <div
                                className="bg-slate-100 shadow-sm rounded-2xl"
                                style={{ marginTop: "4px" }}
                                onClick={() => {
                                  open(), setSelectedNotification(data);
                                }}
                                key={index}
                              >
                                <div className="grid grid-cols-12 py-5 px-4">
                                  <div className="col-span-1">
                                    <IconBell size={27} color="#A6AEBF" />
                                  </div>
                                  <div className="col-span-1">
                                    <div className="w-px h-full bg-gray-300 mx-4" />
                                  </div>
                                  <div className="col-span-9 mx-auto">
                                    <Text
                                      fw={"bold"}
                                      size="14px"
                                      lineClamp={2}
                                      c={"#A6AEBF"}
                                    >
                                      {data.message}
                                    </Text>
                                  </div>
                                  <div className="col-span-1">
                                    <UnstyledButton
                                    // onClick={() => {
                                    //   navigate("/notification/detail", {
                                    //     state: { data },
                                    //   });
                                    // }}
                                    >
                                      <IconChevronRight color="#A6AEBF" />
                                    </UnstyledButton>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                      {notifications.length == 0 && (
                        <div className="p-4 mb-10">
                          <div className="mt-2 px-3 py-2">
                            <div className="flex justify-center">
                              <Image
                                src="/images/not-found.svg"
                                style={{
                                  width: "120px",
                                }}
                              />
                            </div>
                            <div className="flex justify-center">
                              <Text fw={700} size="xl" c={"gray"}>
                                Ups!
                              </Text>
                            </div>
                            <div className="flex justify-center -mt-1">
                              <Text fw={700} size="sm" c={"gray"}>
                                Notifikasi anda kosong
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            )}
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Modal opened={opened} onClose={closeModal} title="Notifikasi">
            <section className="  flex flex-col gap-2 mt-2 mb-2">
              <div className="flex justify-between px-4">
                <Text size="md" fw={"bold"} truncate="end">
                  {selectedNotification?.type}
                </Text>
                <Text size="sm" my={"auto"}>
                  {format(
                    selectedNotification?.created_at
                      ? selectedNotification.created_at
                      : new Date(),
                    "dd MMM yyyy, HH:mm",
                    {
                      locale: id,
                    }
                  )}
                </Text>
              </div>
              <Divider />
              <div className="px-4 mb-5">
                <Text size="md">{selectedNotification?.message}</Text>
              </div>
              <div className="flex justify-between gap-2">
                <Button
                  size="sm"
                  color="grey"
                  fullWidth
                  onClick={() =>
                    handleDeleteNotification(selectedNotification?.id)
                  }
                >
                  Hapus
                </Button>
                <Button
                  size="sm"
                  color="blue"
                  fullWidth
                  disabled={selectedNotification?.was_read}
                  onClick={() => handleWasRead()}
                >
                  Tandai dibaca
                </Button>
              </div>
            </section>
          </Modal>
          {/* SUB MENU LIST */}

          {/* {submenu[0].maintitle !== "none" && (
            <section
              id="submenulist"
              className="rounded-md mb-4 flex justify-center gap-5"
            >
              {submenu.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => navigate(item.href)}
                  variant={
                    location.pathname.includes(item.href) ? "filled" : "outline"
                  }
                  color="blue"
                  leftSection={item.icon}
                >
                  {item.title}
                </Button>
              ))}
            </section>
          )} */}

          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
};
