declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAP_API_KEY: string;
    }
  }
}

export {};
