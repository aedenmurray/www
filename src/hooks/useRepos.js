import useSWR from 'swr';

export default function useRepos() {
  const { data, error, isLoading } = useSWR('https://api.github.com/users/aedenmurray/repos');
  return { repos: data, loading: isLoading, error };
}
