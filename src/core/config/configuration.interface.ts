import { DataSourceOptions } from 'typeorm';

export interface Configuration {
  postgres: {
    retryAttempts?: number;
    retryDelay?: number;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
  } & Partial<DataSourceOptions> & { type: 'postgres' }; // enforce postgres

  port: number;
  baseUrl: string;
}
