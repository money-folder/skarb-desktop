import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useDbSources = (): UseQueryResult<string[]> => {
  return useQuery<string[]>({
    queryKey: ['dbSources'],
    queryFn: () => window.electron.ipcRenderer.connection.getDbSources(),
  });
};

export const useLinkDbSource = (): UseMutationResult<
  string[],
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (filePath: string) =>
      window.electron.ipcRenderer.connection.addDbSource(filePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dbSources'] });
    },
  });
};

export const useRemoveDbSource = (): UseMutationResult<
  string[],
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (filePath: string) =>
      window.electron.ipcRenderer.connection.deleteDbSource(filePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dbSources'] });
    },
  });
};

export const useConnectToDb = (): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (filePath: string) =>
      window.electron.ipcRenderer.connection.connectToDb(filePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dbSources'] });
      queryClient.invalidateQueries({ queryKey: ['currentConnection'] });
    },
  });
};

export const useCurrentConnection = (): UseQueryResult<string | null> => {
  return useQuery<string | null>({
    queryKey: ['currentConnection'],
    queryFn: () =>
      window.electron.ipcRenderer.connection.getCurrentConnection(),
  });
};

export const useCreateConnection = (): UseMutationResult<
  string | null,
  unknown,
  void,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => window.electron.ipcRenderer.connection.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dbSources'] });
      queryClient.invalidateQueries({ queryKey: ['currentConnection'] });
    },
  });
};
