import { useState, useEffect } from 'react';
import { BranchData } from '../data/schools';

export function useSchools() {
  const [schools, setSchools] = useState<BranchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        if (!response.ok) throw new Error('Failed to fetch schools');
        const data = await response.json();
        setSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  const updateSchool = async (school: BranchData) => {
    try {
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(school),
      });
      if (!response.ok) throw new Error('Failed to update school');
      setSchools(prev => prev.map(s => s.id === school.id ? school : s));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { schools, loading, error, updateSchool };
}
