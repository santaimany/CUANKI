import type { Config as DriverConfig, DriveStep } from 'driver.js';

export interface TourConfig {
  /** Unique identifier for this tour */
  id: string;
  /** Route patterns that should trigger this tour */
  routes: string[];
  /** Ordered list of steps */
  steps: DriveStep[];
  /** Optional driver.js overrides */
  options?: Partial<DriverConfig>;
  /** Storage key override for completion status */
  storageKey?: string;
  /** Delay (ms) before automatically launching tour */
  autoStartDelay?: number;
  /** Whether the tour should be auto-started when visiting the page */
  autoStart?: boolean;
}

export type TourConfigMap = Record<string, TourConfig>;
