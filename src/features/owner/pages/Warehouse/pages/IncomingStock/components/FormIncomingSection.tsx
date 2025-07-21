import { Button, Text, TextInput, UnstyledButton } from "@mantine/core";
import {
  IconSquareChevronLeftFilled,
  IconSquareChevronRightFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormIncomingSection: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number | null>(0);
  return (
    <section className="bg-white radius-sm shadow-md p-2">
      <div className="px-2 -mt-2">
        <form>
          <div className="mt-2">
            <TextInput
              label="Nama barang"
              size="sm"
              withAsterisk
              // key={form.key("task_code")}
              // {...form.getInputProps("task_code")}
            />
            <div className="flex gap-2">
              <TextInput
                label="Stok awal"
                size="sm"
                disabled
                value={0}
                // key={form.key("task_code")}
                // {...form.getInputProps("task_code")}
              />
              <TextInput
                label="Stok akhir"
                size="sm"
                disabled
                value={count ?? 0}
                // key={form.key("task_code")}
                // {...form.getInputProps("task_code")}
              />
            </div>
          </div>
          <div className="mt-5 mb-8">
            <div className="grid grid-cols-12 text-center">
              <div className="col-span-4 my-auto">
                <UnstyledButton
                  disabled={count ? (count < 1 ? true : false) : true}
                  size="xl"
                  onClick={() => setCount((count ?? 0) - 1)}
                >
                  <IconSquareChevronLeftFilled size={40} color="#4B352A" />
                </UnstyledButton>
              </div>
              <div className="col-span-4">
                <Text size={"60px"} c={"green"} fw={700}>
                  {count}
                </Text>
              </div>
              <div className="col-span-4 my-auto">
                <UnstyledButton
                  size="xl"
                  onClick={() => setCount((count ?? 0) + 1)}
                >
                  <IconSquareChevronRightFilled size={40} color="#4B352A" />
                </UnstyledButton>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-4 mb-5">
            <Button
              size="sm"
              fullWidth
              color="gray"
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>
            <Button type="submit" fullWidth onClick={() => navigate(-1)}>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
