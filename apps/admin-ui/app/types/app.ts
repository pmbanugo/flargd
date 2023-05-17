export interface App {
  name: string;
  description?: string;
}

export interface TeamApp {
  apps: App[];
  defaultApp: string;
}
