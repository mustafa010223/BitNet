import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Simulation,
  Building,
  SceneConfig,
} from '../types';
import { ThemeMode, Language } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';

interface AppState {
  theme: ThemeMode;
  language: Language;
  currentSimulation: Simulation | null;
  buildings: Building[];
  selectedBuilding: Building | null;
  sceneConfig: SceneConfig;
  cameraPreset: string;
  isLoading: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  }>;

  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  setCurrentSimulation: (simulation: Simulation | null) => void;
  setBuildings: (buildings: Building[]) => void;
  selectBuilding: (building: Building | null) => void;
  updateSceneConfig: (config: Partial<SceneConfig>) => void;
  setCameraPreset: (preset: string) => void;
  setLoading: (isLoading: boolean) => void;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: ThemeMode.DARK,
      language: Language.EN,
      currentSimulation: null,
      buildings: [],
      selectedBuilding: null,
      sceneConfig: {
        enableShadows: true,
        shadowQuality: 'high',
        antialiasing: true,
        postProcessing: true,
        ambientOcclusion: false,
        bloom: false,
        toneMapping: 'ACESFilmic',
      },
      cameraPreset: 'default',
      isLoading: false,
      notifications: [],

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrentSimulation: (simulation) => set({ currentSimulation: simulation }),
      setBuildings: (buildings) => set({ buildings }),
      selectBuilding: (building) => set({ selectedBuilding: building }),
      updateSceneConfig: (config) =>
        set((state) => ({
          sceneConfig: { ...state.sceneConfig, ...config },
        })),
      setCameraPreset: (preset) => set({ cameraPreset: preset }),
      setLoading: (isLoading) => set({ isLoading }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: Date.now().toString() },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER_PREFERENCES,
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sceneConfig: state.sceneConfig,
      }),
    }
  )
);
