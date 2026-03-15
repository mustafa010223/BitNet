export const APP_CONFIG = {
  NAME: 'BitNet City3D Intelligence Platform',
  VERSION: '2.0.0',
  API_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
} as const;

export const SIMULATION_DEFAULTS = {
  CITY_SIZE: 100,
  BUILDING_DENSITY: 0.3,
  GREEN_SPACE_RATIO: 0.2,
  GRID_SIZE: 10,
  ROAD_WIDTH: 2,
  MIN_BUILDING_HEIGHT: 5,
  MAX_BUILDING_HEIGHT: 30,
  BUILDING_SPACING: 3,
} as const;

export const CAMERA_PRESETS = {
  DEFAULT: {
    position: [50, 40, 50] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 60,
  },
  AERIAL: {
    position: [0, 100, 0] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 75,
  },
  STREET: {
    position: [10, 5, 10] as [number, number, number],
    target: [0, 5, 0] as [number, number, number],
    fov: 80,
  },
  OVERVIEW: {
    position: [100, 80, 100] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 50,
  },
} as const;

export const BUILDING_COLORS = {
  residential: '#3b82f6',
  commercial: '#10b981',
  industrial: '#f59e0b',
  office: '#8b5cf6',
  mixed_use: '#ec4899',
  public: '#ef4444',
  recreation: '#14b8a6',
} as const;

export const CHART_COLORS = {
  primary: '#00ff88',
  secondary: '#3b82f6',
  accent: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
} as const;

export const THEME_COLORS = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#00ff88',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    border: '#e5e7eb',
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
  },
  dark: {
    background: '#0a0f1e',
    foreground: '#ffffff',
    primary: '#00ff88',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    border: '#1e293b',
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#475569',
    },
  },
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  modal: 2000,
  notification: 3000,
  tooltip: 4000,
} as const;

export const PERFORMANCE_THRESHOLDS = {
  GOOD_FPS: 60,
  ACCEPTABLE_FPS: 30,
  POOR_FPS: 15,
  MAX_INFERENCE_TIME: 5000,
  MAX_MEMORY_MB: 2048,
} as const;

export const API_ROUTES = {
  SIMULATIONS: '/simulations',
  AI_INTERACTIONS: '/ai_interactions',
  PERFORMANCE_METRICS: '/performance_metrics',
  USERS: '/users',
  AUTH: '/auth',
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME: 'bitnet_theme',
  LANGUAGE: 'bitnet_language',
  USER_PREFERENCES: 'bitnet_user_preferences',
  CACHED_SIMULATIONS: 'bitnet_cached_simulations',
  AUTH_TOKEN: 'bitnet_auth_token',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  PERMISSION_ERROR: 'You do not have permission to perform this action.',
  VALIDATION_ERROR: 'Invalid input. Please check your data.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NOT_FOUND: 'Requested resource not found.',
  TIMEOUT: 'Request timed out. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  SIMULATION_CREATED: 'Simulation created successfully',
  SIMULATION_UPDATED: 'Simulation updated successfully',
  SIMULATION_DELETED: 'Simulation deleted successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
  EXPORT_COMPLETED: 'Export completed successfully',
} as const;

export const BITNET_MODELS = {
  SMALL: {
    name: 'bitnet-1.58-3B',
    params: '3B',
    memory: '1.5GB',
    speed: 'Fast',
  },
  LARGE: {
    name: 'bitnet-1.58-8B',
    params: '8B',
    memory: '3.5GB',
    speed: 'Medium',
  },
  ULTRA: {
    name: 'Llama3-8B-1.58',
    params: '8B',
    memory: '4GB',
    speed: 'High Quality',
  },
} as const;

export const VALIDATION_RULES = {
  SIMULATION_NAME: {
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s-_]+$/,
  },
  CITY_SIZE: {
    min: 10,
    max: 500,
  },
  BUILDING_DENSITY: {
    min: 0.1,
    max: 0.9,
  },
  GREEN_SPACE_RATIO: {
    min: 0,
    max: 0.5,
  },
} as const;

export const KEYBOARD_SHORTCUTS = {
  SAVE: 'ctrl+s',
  NEW_SIMULATION: 'ctrl+n',
  TOGGLE_AI: 'ctrl+space',
  RESET_CAMERA: 'r',
  TOGGLE_GRID: 'g',
  SCREENSHOT: 'p',
  FULLSCREEN: 'f11',
} as const;

export const WEB_WORKER_MESSAGES = {
  GENERATE_CITY: 'generate_city',
  CALCULATE_METRICS: 'calculate_metrics',
  PROCESS_AI: 'process_ai',
} as const;
