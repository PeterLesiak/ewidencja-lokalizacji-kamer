import { useQuery } from '@tanstack/react-query';

import getUser from '@/actions/get-user';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};
