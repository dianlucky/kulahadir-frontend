import storage from "@/utils/storage";

export const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  if (!response.ok) {
    console.error(
      `Gagal mengunduh file: ${response.status} ${response.statusText}`
    );

    throw new Error(
      `Gagal mengunduh file: ${response.status} ${response.statusText}`
    );
  }

  const blob = await response.blob();

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
};
