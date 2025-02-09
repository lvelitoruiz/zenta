import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MetricDto, MetricsOverviewDto } from './dto/metric.dto';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Obtener resumen de métricas' })
  @ApiQuery({ name: 'organizationId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Resumen de métricas',
    type: MetricsOverviewDto,
  })
  getOverview(@Query('organizationId', ParseIntPipe) organizationId: number) {
    return this.metricsService.getOverview(organizationId);
  }

  @Get('trends')
  @ApiOperation({ summary: 'Obtener tendencias históricas' })
  @ApiQuery({ name: 'organizationId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Tendencias históricas',
    type: [MetricDto],
  })
  getTrends(@Query('organizationId', ParseIntPipe) organizationId: number) {
    return this.metricsService.getTrends(organizationId);
  }
}
