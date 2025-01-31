import { Avatar } from '@mantine/core';
import { useEffect, useState } from 'react';


import { LoginForm } from '../components';
import { Companys } from '../types';

export const Login: React.FC = () => {
  const BASE_URL = window.location.origin;
  const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/';
  const [company, setCompany] = useState<Companys | undefined>(undefined);

  // Get Company

  // useEffect(() => {
  //   if (data) {
  //     // Search for the company that matches the base URL
  //     const company = data.find((company: any) => company.companyUrl === BASE_URL);
  //     company && localStorage.setItem('company', company);
  //     setCompany(company);
  //   }
  // }, [BASE_URL, data]);

  // Get Base URL now
  return (
    <main className="w-full mx-auto flex p-10">
      <div className="m-auto pt-10 w-full lg:w-[350px]">
        <div className="flex items-center justify-center mb-16 mt-9">
          {company ? (
            <Avatar
              src={
                company?.company_logo
                  ? BaseURL + '/public/company-logo/' + company?.company_logo
                  : '/images/kpi-logo.png'
              }
              alt="it's me"
              size={100}
            />
          ) : (
            <img src="/images/kpi-logo.png" alt="" className="w-20" />
          )}
        </div>
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-xs mb-7">Welcome back, please enter your account</p>
        <LoginForm />
      </div>
    </main>
  );
};
