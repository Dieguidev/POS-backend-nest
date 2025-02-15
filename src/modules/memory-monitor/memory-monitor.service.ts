import { Injectable, Logger } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class MemoryMonitorService {
  private readonly logger = new Logger('MemoryMonitor');
  private monitoringInterval: NodeJS.Timeout;
  private isMonitoring = false;

  /**
   * Obtiene una única lectura de memoria
   */
  public getMemorySnapshot() {
    const memoryUsage = process.memoryUsage();
    return {
      timestamp: new Date().toISOString(),
      heap: {
        used: this.formatMemoryUsage(memoryUsage.heapUsed),
        total: this.formatMemoryUsage(memoryUsage.heapTotal),
        percentage: `${Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100)}%`
      },
      rss: this.formatMemoryUsage(memoryUsage.rss),
      external: this.formatMemoryUsage(memoryUsage.external),
      system: {
        total: this.formatMemoryUsage(os.totalmem()),
        free: this.formatMemoryUsage(os.freemem()),
        used: this.formatMemoryUsage(os.totalmem() - os.freemem()),
        percentage: `${Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`
      }
    };
  }

  /**
   * Inicia el monitoreo con opciones configurables
   */
  public startMonitoring(options: {
    interval?: number;        // Intervalo en ms
    logToConsole?: boolean;   // Si debe mostrar logs en consola
    maxDuration?: number;     // Duración máxima del monitoreo en ms
  } = {}) {
    if (this.isMonitoring) {
      this.logger.warn('El monitoreo ya está activo');
      return;
    }

    const {
      interval = 60000,
      logToConsole = true,
      maxDuration = 120000
    } = options;

    this.isMonitoring = true;

    if (logToConsole) {
      this.logger.log('Iniciando monitoreo de memoria');
      this.logMemoryStats();
    }

    this.monitoringInterval = setInterval(() => {
      if (logToConsole) {
        this.logMemoryStats();
      }
    }, interval);

    // Si se especifica una duración máxima, programar la detención
    if (maxDuration > 0) {
      setTimeout(() => {
        this.stopMonitoring();
      }, maxDuration);
    }
  }

  /**
   * Detiene el monitoreo
   */
  public stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.isMonitoring = false;
      this.logger.log('Monitoreo de memoria detenido');
    }
  }

  private formatMemoryUsage(bytes: number): string {
    return `${Math.round(bytes / 1024 / 1024 * 100) / 100} MB`;
  }

  private logMemoryStats() {
    const stats = this.getMemorySnapshot();
    this.logger.log({
      message: 'Estadísticas de memoria',
      ...stats
    });
  }
}
