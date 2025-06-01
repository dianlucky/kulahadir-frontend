import { Avatar, Image } from "@mantine/core";

import { LoginForm } from "../components";

export const Login: React.FC = () => {
  const BaseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/";

  return (
    <main className="w-full mx-auto flex p-10 bg-brown min-h-screen">
      <div className="bg-white shadow-sm rounded-lg p-5 m-auto">
        <div className="pt-10 w-full lg:w-[350px]">
          <div className="flex items-center justify-center -mt-10">
            <Image src="/images/kulakita-logo.png" w={140} />
          </div>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-xs mb-7">
            Selamat datang, kulateam!
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};
