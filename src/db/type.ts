type Query = <T extends object>(
  sql: string,
  values?: any[],
) => Promise<{ rows: T[] }>;
export type Client = {
  query: Query;
  release: () => Promise<void>;
};
export type DB = {
  query: Query;
  pool: {
    connect: () => Promise<Client>;
  };
};
