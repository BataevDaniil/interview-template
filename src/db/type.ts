export type DB = {
  query: (sql: string, values?: string[]) => Promise<{ rows: object[] }>;
};
