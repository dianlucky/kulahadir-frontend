import { SalaryType } from "@/types";
import { Button, Divider, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SalarySectionProps {
  salary: SalaryType | undefined;
}

export const SalarySection: React.FC<SalarySectionProps> = ({ salary }) => {
  console.log("Gaji pegawai : ", salary);
  const handleDownloadPDF = async () => {
    const slipElement = document.getElementById("salary-slip");
    if (!slipElement) return;

    const canvas = await html2canvas(slipElement, {
      scale: 2, // high resolution
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Ukuran gambar asli (dalam px)
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Hitung rasio supaya muat 1 halaman
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    // Ukuran gambar dalam mm di PDF
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Tengahin secara horizontal & vertikal (opsional)
    const marginX = (pdfWidth - scaledWidth) / 2;
    const marginY = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "PNG", marginX, marginY, scaledWidth, scaledHeight);
    pdf.save(`slip-gaji-${Date.now()}.pdf`);
  };
  return (
    <div id="salary-slip" className="bg-white shadow-sm p-4">
      <div className="flex justify-between mb-1 px-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Slip gaji pegawai
        </div>
        <div className="my-auto mb-1">
          <Button
            size="compact-sm"
            onClick={handleDownloadPDF}
            className="h-6 w-6 px-0 py-0 min-w-0"
          >
            <IconDownload className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Divider />
      <div className="text-center mt-2 mb-3">
        <div>
          <Text fw={"bold"} size="md">
            ANGKRINGAN KULAKITA
          </Text>
        </div>
        <div>
          <Text size="10px">
            Jl. Ahmad Yani, Angsau, Kec. Pelaihari, Kab. Tanah Laut, Kalimantan
            Selatan 70815
          </Text>
        </div>
      </div>
      <Divider />
      <div className="px-2 mt-1 mb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Nama{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">{salary?.employee.name}</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Jabatan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">{salary?.employee.account.level}</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Status{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">{salary?.employee.account.status}</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Bulan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">
              {salary != undefined &&
                format(salary.date, "MMMM yyyy", { locale: id })}
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="px-2 mt-1 mb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Gaji pokok{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(
                  salary.amount -
                    salary.bonus +
                    salary.cash_advance +
                    salary.salary_deduction
                )}`}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Bonus{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">
              {" "}
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(salary.bonus)}`}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <Text size="sm" fw={"bold"}>
              Total pendapatan :{" "}
            </Text>
          </div>
          <div className="col-span-5 mt-1 text-end">
            <Text size="13px">
              {" "}
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(
                  salary.amount + salary.cash_advance + salary.salary_deduction
                )}`}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-3">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Potongan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">
              {" "}
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(
                  salary.salary_deduction
                )}`}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Kasbon{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">
              {" "}
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(
                  salary.cash_advance
                )}`}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <Text size="sm" fw={"bold"}>
              Total potongan :{" "}
            </Text>
          </div>
          <div className="col-span-5 mt-1 text-end">
            <Text size="13px">
              {" "}
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(
                  salary.salary_deduction + salary.cash_advance
                )}`}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-3 mb-2">
          <div className="col-span-5">
            <Text size="sm" fw={"bold"}>
              Gaji diterima{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-6 mt-1 text-end">
            <Text size="13px">
              {" "}
              {salary != undefined &&
                ` Rp. ${new Intl.NumberFormat("id-ID").format(salary.amount)}`}
            </Text>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mb-2 mt-1">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Catatan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1">
            <Text size="13px"> {salary?.note}</Text>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-4 mb-2">
          <div className="col-span-3" />
          <div className="col-span-9 text-center">
            <Text size="xs">
              Tanah Laut,{" "}
              {salary != undefined &&
                format(salary?.created_at, "dd MMMM yyyy", {
                  locale: id,
                })}
            </Text>
            <Text size="xs" m={6} fs={"italic"}>
              Hafiz Anshari{" "}
            </Text>
            <Text size="xs">(Owner Kulakita)</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
