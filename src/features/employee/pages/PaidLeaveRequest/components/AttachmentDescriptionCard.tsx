import { Divider, Image, Text } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons-react";

export const AttachmentDescriptionCard: React.FC = () => {
    return (
      <section className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span style={{ fontSize: "14px" }} className="font-bold text-brown">
            Lampiran dan keterangan
          </span>
          <IconClipboardText className="opacity-100" size={20} />
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="gap-2 mt-0">
            <Text size="sm" fw={700}>
              Lampiran :
            </Text>
            <Image
              radius="md"
              h={200}
              style={{
                justifyContent: "center",
                padding: "10",
                marginTop: "-20px",
                width: "90% ",
              }}
              fit="contain"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
          </div>
          <div className="gap-2 -mt-2 mb-5">
            <Text size="sm" fw={700}>
              Keterangan :{" "}
            </Text>
            <Text size="sm"></Text>
          </div>
        </div>
      </section>
    );
}