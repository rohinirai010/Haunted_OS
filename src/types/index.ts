export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

export type AppId = 'ghost-editor' | 'pumpkin-mail' | 'zombie-terminal' | 'crypt-files' | 'seance-chat';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: string;
  component: React.ComponentType<{ windowId: string }>;
}
