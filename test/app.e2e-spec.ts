import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as should from 'should';

import { AppModule } from './../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(helmet());

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  describe('LocationController', () => {
    it('/v1/location (With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/location')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(200)
        .expect((res) => {
          should(res.body).have.properties({
            country: 'Ecuador',
            countryCode: 'EC',
          });
        });
    });

    it('/v1/location (Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/location')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });

    it('/v1/location/search (Without Query Param)', () => {
      return request(app.getHttpServer())
        .get('/v1/location/search')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            error: 'Bad Request',
          });
        });
    });

    it('/v1/location/search?q=Rioja (With Query Param)', () => {
      return request(app.getHttpServer())
        .get('/v1/location/search?q=Rioja')
        .expect(200)
        .expect((res) => {
          should(res.body).have.lengthOf(5);
        });
    });

    it('/v1/location/search?q=7398338484 (With Invalid Query Param)', () => {
      return request(app.getHttpServer())
        .get('/v1/location/search?q=7398338484')
        .expect(200)
        .expect((res) => {
          should(res.body).have.lengthOf(0);
        });
    });
  });

  describe('CurrentController', () => {
    it('/v1/current (With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(200)
        .expect((res) => {
          should(res.body)
            .have.properties(['location', 'weather'])
            .and.propertyByPath('location', 'country')
            .eql('EC');
        });
    });

    it('/v1/current (Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });

    it('/v1/current/Rioja (Valid City, Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current/Rioja')
        .expect(200)
        .expect((res) => {
          should(res.body)
            .have.properties(['location', 'weather'])
            .and.propertyByPath('location', 'city')
            .eql('La Rioja');
        });
    });

    it('/v1/current/878788788 (Invalid City, Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current/878788788')
        .expect(404)
        .expect((res) => {
          should(res.body).have.properties({
            message: 'Location Not Found',
            statusCode: 404,
          });
        });
    });

    it('/v1/current/Rioja (Valid City, With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current/Rioja')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(200)
        .expect((res) => {
          should(res.body)
            .have.properties(['location', 'weather'])
            .and.propertyByPath('location', 'city')
            .eql('La Rioja');
        });
    });

    it('/v1/current/878788788 (Invalid City, With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current/878788788')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(404)
        .expect((res) => {
          should(res.body).have.properties({
            message: 'Location Not Found',
            statusCode: 404,
          });
        });
    });

    it('/v1/current (Invalid IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current')
        .set('X-Forwarded-For', '127.0.0.1')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });

    it('/v1/current (Invalid IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/current')
        .set('X-Forwarded-For', '::1')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });
  });

  describe('ForecastController', () => {
    it('/v1/forecast (With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(200)
        .expect((res) => {
          should(res.body)
            .have.properties(['location', 'forecast'])
            .and.propertyByPath('location', 'country')
            .eql('EC');
        });
    });

    it('/v1/forecast (Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });

    it('/v1/forecast/Rioja (Valid City, Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast/Rioja')
        .expect(200)
        .expect((res) => {
          should(res.body)
            .have.properties(['location', 'forecast'])
            .and.propertyByPath('location', 'city')
            .eql('La Rioja');
        });
    });

    it('/v1/forecast/878788788 (Invalid City, Without IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast/878788788')
        .expect(404)
        .expect((res) => {
          should(res.body).have.properties({
            message: 'Location Not Found',
            statusCode: 404,
          });
        });
    });

    it('/v1/forecast/Rioja (Valid City, With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast/Rioja')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(200)
        .expect((res) => {
          should(res.body)
            .have.properties(['location', 'forecast'])
            .and.propertyByPath('location', 'city')
            .eql('La Rioja');
        });
    });

    it('/v1/forecast/878788788 (Invalid City, With IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast/878788788')
        .set('X-Forwarded-For', '190.12.10.78')
        .expect(404)
        .expect((res) => {
          should(res.body).have.properties({
            message: 'Location Not Found',
            statusCode: 404,
          });
        });
    });

    it('/v1/forecast (Invalid IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast')
        .set('X-Forwarded-For', '127.0.0.1')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });

    it('/v1/forecast (Invalid IP)', () => {
      return request(app.getHttpServer())
        .get('/v1/forecast')
        .set('X-Forwarded-For', '::1')
        .expect(400)
        .expect((res) => {
          should(res.body).have.properties({
            statusCode: 400,
            message: 'Invalid IP',
          });
        });
    });
  });
});
