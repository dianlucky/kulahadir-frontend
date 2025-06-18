import { useAuth } from '../hooks';
import { Creds } from '../types';

type Props = {
  role: Creds['level'][];
  children: React.ReactNode;
};

export const Authorization: React.FC<Props> = ({ role, children }) => {
  const { creds } = useAuth();

  if (!role.includes(creds?.level ?? 'Owner')) return null;

  return <>{children}</>;
};
