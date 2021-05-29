/* eslint-disable no-console */
import { errorFormat } from './errorFormat.utils';

class Logger {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  private prepareTag(level: 'log' | 'error'): string {
    return `${this.tag} <${level}>`;
  }

  private prepareMetaData(metaData: any): any {
    for (const i in metaData) {
      if (metaData[i] instanceof Error) {
        metaData[i] = errorFormat(
          metaData[i],
          true
        );
      }
    }

    return metaData;
  }

  public log(message: string, metaData: any = {}): void {
    const date: Date = new Date();

    if (process.env.NODE_ENV !== 'test') {
      console.log(
        JSON.stringify({
          tag: this.prepareTag('log'),
          message,
          level: 'log',
          formattedDate: date.toISOString(),
          env: process.env.NODE_ENV,
          processId: process.pid,
          clusterType: process.env.CLUSTER_TYPE,
          timestamp: date.getTime(),
          metaData: this.prepareMetaData(metaData),
        }),
      );
      console.log(' ');
    }
  }

  public error(message: string, metaData: any = {}): void {
    const date: Date = new Date();

    if (process.env.NODE_ENV !== 'test') {
      console.error(
        JSON.stringify({
          tag: this.prepareTag('error'),
          message,
          level: 'error',
          formattedDate: date.toISOString(),
          env: process.env.NODE_ENV,
          processId: process.pid,
          clusterType: process.env.CLUSTER_TYPE,
          timestamp: date.getTime(),
          metaData: this.prepareMetaData(metaData),
        }),
      );
      console.error(' ');
    }
  }
}

export { Logger };
