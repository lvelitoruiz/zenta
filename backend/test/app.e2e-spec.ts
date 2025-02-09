import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/metrics/overview (GET)', () => {
    return request(app.getHttpServer())
      .get('/metrics/overview')
      .query({ organizationId: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalRevenue');
        expect(res.body).toHaveProperty('totalProducts');
        expect(res.body).toHaveProperty('lowStockItems');
        expect(res.body).toHaveProperty('averagePrice');
      });
  });
});
