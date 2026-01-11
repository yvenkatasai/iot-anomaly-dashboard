import useFirestore from './useFirestore';

export default function useSensorData() {
  const { data, loading } = useFirestore('sensors', { orderField: 'timestamp', orderDirection: 'asc' });
  return { sensors: data, loading };
}
