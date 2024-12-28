import useSWR from 'swr';

export default function useRepos() {
  const { data, error, isLoading } = useSWR('https://api.github.com/users/aedenmurray/repos');
  return !error
    ? { repos: data ?? [], loading: isLoading, error }
    : { repos: [], loading: isLoading, error };
}
