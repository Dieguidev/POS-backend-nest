import { Module } from '@nestjs/common';
import { MemoryMonitorService } from './memory-monitor.service';


@Module({
  providers: [MemoryMonitorService],
  exports: [MemoryMonitorService],
})
export class MemoryMonitorModule {}
