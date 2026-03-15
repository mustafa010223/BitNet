import { useEffect } from 'react';
import { apiService } from '../services/api.service';
import type { Simulation, AIInteraction, PerformanceMetric } from '../types';

export function useRealtimeSimulations(
  onUpdate: (simulation: Simulation) => void
) {
  useEffect(() => {
    const subscription = apiService.subscribeToSimulations(onUpdate);

    return () => {
      subscription.unsubscribe();
    };
  }, [onUpdate]);
}

export function useRealtimeAIInteractions(
  onUpdate: (interaction: AIInteraction) => void
) {
  useEffect(() => {
    const subscription = apiService.subscribeToAIInteractions(onUpdate);

    return () => {
      subscription.unsubscribe();
    };
  }, [onUpdate]);
}

export function useRealtimePerformanceMetrics(
  onUpdate: (metric: PerformanceMetric) => void
) {
  useEffect(() => {
    const subscription = apiService.subscribeToPerformanceMetrics(onUpdate);

    return () => {
      subscription.unsubscribe();
    };
  }, [onUpdate]);
}
