export type DB = {
  query: (sql: string, values?: any[]) => Promise<{ rows: object[] }>;
};
