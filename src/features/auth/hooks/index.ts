import { useContext } from 'react';

import { AuthContext } from '../contexts';

export const useAuth = () => {
  const context = useContext(AuthContext);

  function getRoleText() {
    switch (context.creds?.level) {
      case 'employee':
        return 'employee';
      case 'admin':
        return 'admin';
      case 'owner':
        return 'owner';
      default:
        return 'employee';
    }
  }

  return { ...context, getRoleText };
};
