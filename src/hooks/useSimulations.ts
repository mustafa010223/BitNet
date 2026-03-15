import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api.service';
import type { Simulation, PaginationParams, FilterParams } from '../types';
import { useAppStore } from '../store/appStore';

export function useSimulations(
  pagination?: PaginationParams,
  filters?: FilterParams
) {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const { addNotification } = useAppStore();

  const fetchSimulations = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await apiService.getSimulations(pagination, filters);

    if (response.error) {
      setError(response.error);
      addNotification({
        type: 'error',
        message: response.error,
      });
    } else if (response.data) {
      setSimulations(response.data);
      setTotal(response.metadata?.total || 0);
    }

    setLoading(false);
  }, [pagination, filters, addNotification]);

  useEffect(() => {
    fetchSimulations();
  }, [fetchSimulations]);

  const createSimulation = useCallback(
    async (simulation: Partial<Simulation>) => {
      const response = await apiService.createSimulation(simulation);

      if (response.error) {
        addNotification({
          type: 'error',
          message: response.error,
        });
        return null;
      }

      addNotification({
        type: 'success',
        message: 'Simulation created successfully',
      });

      fetchSimulations();
      return response.data;
    },
    [fetchSimulations, addNotification]
  );

  const updateSimulation = useCallback(
    async (id: string, updates: Partial<Simulation>) => {
      const response = await apiService.updateSimulation(id, updates);

      if (response.error) {
        addNotification({
          type: 'error',
          message: response.error,
        });
        return null;
      }

      addNotification({
        type: 'success',
        message: 'Simulation updated successfully',
      });

      fetchSimulations();
      return response.data;
    },
    [fetchSimulations, addNotification]
  );

  const deleteSimulation = useCallback(
    async (id: string) => {
      const response = await apiService.deleteSimulation(id);

      if (response.error) {
        addNotification({
          type: 'error',
          message: response.error,
        });
        return false;
      }

      addNotification({
        type: 'success',
        message: 'Simulation deleted successfully',
      });

      fetchSimulations();
      return true;
    },
    [fetchSimulations, addNotification]
  );

  return {
    simulations,
    loading,
    error,
    total,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    refresh: fetchSimulations,
  };
}
