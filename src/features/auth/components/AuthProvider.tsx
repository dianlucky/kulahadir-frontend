import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';
// import { useEmployee } from '@/features/employee';

import { logout, useCreds } from '../api';
import { AuthContext } from '../contexts';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const credsQuery = useCreds();
  const navigate = useNavigate();
  // const employeeQuery = useEmployee({ config: { enabled: false } });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
  });

  const value = useMemo(
    () => ({
      creds: credsQuery.data ?? null,
      // employee: employeeQuery.data ?? null,
      logout: logoutMutation.mutateAsync,
    }),
    [credsQuery, logoutMutation.mutateAsync]
  );

  // if (credsQuery.isLoading || employeeQuery.isFetching || logoutMutation.isPending)
  //   return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
