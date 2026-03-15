import { supabase } from '../lib/supabase';
import type {
  Simulation,
  AIInteraction,
  PerformanceMetric,
  ApiResponse,
  PaginationParams,
  FilterParams,
} from '../types';

class ApiService {
  private handleError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }

  async getSimulations(
    pagination?: PaginationParams,
    filters?: FilterParams
  ): Promise<ApiResponse<Simulation[]>> {
    try {
      let query = supabase.from('simulations').select('*', { count: 'exact' });

      if (filters?.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }

      if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte('created_at', filters.dateTo);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (pagination) {
        const { page, limit, orderBy = 'created_at', order = 'desc' } = pagination;
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to).order(orderBy, { ascending: order === 'asc' });
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: data as Simulation[],
        error: null,
        metadata: {
          total: count || 0,
          page: pagination?.page || 1,
          limit: pagination?.limit || data?.length || 0,
        },
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async getSimulation(id: string): Promise<ApiResponse<Simulation>> {
    try {
      const { data, error } = await supabase
        .from('simulations')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      return {
        data: data as Simulation,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async createSimulation(simulation: Partial<Simulation>): Promise<ApiResponse<Simulation>> {
    try {
      const { data, error } = await supabase
        .from('simulations')
        .insert(simulation)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as Simulation,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async updateSimulation(
    id: string,
    updates: Partial<Simulation>
  ): Promise<ApiResponse<Simulation>> {
    try {
      const { data, error } = await supabase
        .from('simulations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as Simulation,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async deleteSimulation(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.from('simulations').delete().eq('id', id);

      if (error) throw error;

      return {
        data: null,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async getAIInteractions(
    simulationId?: string,
    pagination?: PaginationParams
  ): Promise<ApiResponse<AIInteraction[]>> {
    try {
      let query = supabase.from('ai_interactions').select('*', { count: 'exact' });

      if (simulationId) {
        query = query.eq('simulation_id', simulationId);
      }

      if (pagination) {
        const { page, limit, orderBy = 'created_at', order = 'desc' } = pagination;
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to).order(orderBy, { ascending: order === 'asc' });
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: data as AIInteraction[],
        error: null,
        metadata: {
          total: count || 0,
          page: pagination?.page || 1,
          limit: pagination?.limit || data?.length || 0,
        },
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async createAIInteraction(
    interaction: Partial<AIInteraction>
  ): Promise<ApiResponse<AIInteraction>> {
    try {
      const { data, error } = await supabase
        .from('ai_interactions')
        .insert(interaction)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as AIInteraction,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async getPerformanceMetrics(
    simulationId?: string,
    metricType?: string,
    pagination?: PaginationParams
  ): Promise<ApiResponse<PerformanceMetric[]>> {
    try {
      let query = supabase.from('performance_metrics').select('*', { count: 'exact' });

      if (simulationId) {
        query = query.eq('simulation_id', simulationId);
      }

      if (metricType) {
        query = query.eq('metric_type', metricType);
      }

      if (pagination) {
        const { page, limit, orderBy = 'recorded_at', order = 'desc' } = pagination;
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to).order(orderBy, { ascending: order === 'asc' });
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: data as PerformanceMetric[],
        error: null,
        metadata: {
          total: count || 0,
          page: pagination?.page || 1,
          limit: pagination?.limit || data?.length || 0,
        },
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async createPerformanceMetric(
    metric: Partial<PerformanceMetric>
  ): Promise<ApiResponse<PerformanceMetric>> {
    try {
      const { data, error } = await supabase
        .from('performance_metrics')
        .insert(metric)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as PerformanceMetric,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  subscribeToSimulations(callback: (simulation: Simulation) => void) {
    return supabase
      .channel('simulations_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'simulations' },
        (payload: any) => {
          callback(payload.new as Simulation);
        }
      )
      .subscribe();
  }

  subscribeToAIInteractions(callback: (interaction: AIInteraction) => void) {
    return supabase
      .channel('ai_interactions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ai_interactions' },
        (payload: any) => {
          callback(payload.new as AIInteraction);
        }
      )
      .subscribe();
  }

  subscribeToPerformanceMetrics(callback: (metric: PerformanceMetric) => void) {
    return supabase
      .channel('performance_metrics_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'performance_metrics' },
        (payload: any) => {
          callback(payload.new as PerformanceMetric);
        }
      )
      .subscribe();
  }
}

export const apiService = new ApiService();
