import { Image, Text } from "@mantine/core";

export const SalaryNotFound: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-xl">
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
          <Text fw={700} size="md">
            Ups!
          </Text>
        </div>
        <div className="flex justify-center -mt-1">
          <Text fw={700} size="sm">
            Gaji masih belum diterbitkan
          </Text>
        </div>
        <div className="flex justify-center -mt-1">
          <Text fw={400} size="xs">
            Yang sabar yaa....
          </Text>
        </div>
      </div>
    </div>
  );
};
