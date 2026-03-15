export enum SimulationStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum MetricType {
  INFERENCE_SPEED = 'inference_speed',
  ENERGY_USAGE = 'energy_usage',
  MEMORY = 'memory',
  LATENCY = 'latency',
  THROUGHPUT = 'throughput',
  CPU_USAGE = 'cpu_usage',
  GPU_USAGE = 'gpu_usage'
}

export enum BuildingType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  OFFICE = 'office',
  MIXED_USE = 'mixed_use',
  PUBLIC = 'public',
  RECREATION = 'recreation'
}

export enum UserRole {
  ADMIN = 'admin',
  PLANNER = 'planner',
  VIEWER = 'viewer',
  ANALYST = 'analyst'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export enum Language {
  EN = 'en',
  TR = 'tr',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  ZH = 'zh',
  JA = 'ja'
}

export interface Simulation {
  id: string;
  name: string;
  description: string;
  config: SimulationConfig;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  user_id?: string;
  metadata?: Record<string, unknown>;
}

export interface SimulationConfig {
  citySize: number;
  buildingDensity: number;
  mixedUse: boolean;
  greenSpaceRatio: number;
  roadNetwork: RoadNetworkConfig;
  zoning: ZoningConfig;
  population?: number;
  economicModel?: EconomicModelConfig;
}

export interface RoadNetworkConfig {
  gridSize: number;
  roadWidth: number;
  intersections: boolean;
  highways: boolean;
}

export interface ZoningConfig {
  residential: number;
  commercial: number;
  industrial: number;
  mixed: number;
  public: number;
}

export interface EconomicModelConfig {
  gdpTarget: number;
  employmentRate: number;
  taxRate: number;
}

export interface AIInteraction {
  id: string;
  simulation_id?: string;
  prompt: string;
  response: string;
  model_version: string;
  inference_time_ms: number;
  tokens_generated: number;
  created_at: string;
  user_id?: string;
  context?: ConversationContext;
  metadata?: Record<string, unknown>;
}

export interface ConversationContext {
  conversation_id: string;
  message_index: number;
  previous_messages: ChatMessage[];
  intent?: string;
  entities?: Record<string, string>;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface PerformanceMetric {
  id: string;
  simulation_id?: string;
  metric_type: MetricType;
  value: number;
  unit: string;
  metadata: Record<string, unknown>;
  recorded_at: string;
}

export interface Building {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  type: BuildingType;
  color: string;
  residents?: number;
  employees?: number;
  energyConsumption?: number;
  selected?: boolean;
  metadata?: BuildingMetadata;
}

export interface BuildingMetadata {
  name?: string;
  yearBuilt?: number;
  floors?: number;
  occupancyRate?: number;
  sustainabilityRating?: number;
  amenities?: string[];
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  preferences: UserPreferences;
  created_at: string;
  last_login?: string;
}

export interface UserPreferences {
  theme: ThemeMode;
  language: Language;
  notifications: boolean;
  analytics: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  timestamp?: string;
  category?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  [key: string]: number | string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  status?: SimulationStatus[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  type?: BuildingType[];
}

export interface Camera {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface CameraPreset {
  name: string;
  camera: Camera;
  description: string;
}

export interface SceneConfig {
  enableShadows: boolean;
  shadowQuality: 'low' | 'medium' | 'high' | 'ultra';
  antialiasing: boolean;
  postProcessing: boolean;
  ambientOcclusion: boolean;
  bloom: boolean;
  toneMapping: string;
}

export interface VisualizationLayer {
  id: string;
  name: string;
  type: 'heatmap' | 'density' | 'flow' | 'zone';
  visible: boolean;
  opacity: number;
  data: unknown;
}

export interface ExportOptions {
  format: 'png' | 'jpg' | 'csv' | 'json' | 'pdf';
  quality?: number;
  includeMetadata?: boolean;
}

export interface WebSocketMessage {
  type: 'update' | 'create' | 'delete' | 'notification';
  payload: unknown;
  timestamp: string;
}

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: () => void;
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface ErrorLog {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
