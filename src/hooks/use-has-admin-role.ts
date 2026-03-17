import { useQuery } from '@tanstack/react-query';

import hasAdminRole from '@/actions/has-admin-role';

export const useHasAdminRole = () => {
  return useQuery({
    queryKey: ['hasAdminRole'],
    queryFn: hasAdminRole,
  });
};
