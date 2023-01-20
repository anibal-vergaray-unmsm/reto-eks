import { TestingModule } from '@nestjs/testing';
import { INestApplication, Request } from '@nestjs/common';
import request from 'supertest';
import { testModule, config } from './test.module';

const url = '/tokens';

describe('CardsController (e2e)', () => {
    let app: INestApplication;
    const testPK = 'pk_test_Az12854780'
    const testData ={
        "card_number": "4787076522158584",
        "cvv": "123",
        "expiration_month": "12",
        "expiration_year": "2025",
        "email": "anibal_dj@yahoo.es"
    };
    const errorTestData ={
        "card_number": "4485275742308327",
        "cvv": "12344",
        "expiration_month": "13",
        "expiration_year": "2050",
        "email": "anibal_dj@outlook.es"
    };
    const errorToken = "123456789";
    let testToken;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await testModule.compile();

    app = moduleFixture.createNestApplication();
    config(app)
    await app.init();
  });

  describe('POST /tokens', () => {
    it('should reply success', (done) => {
        request(app.getHttpServer())
        .post(url)
        .set('Authorization', 'Bearer '+ testPK)
        .send(testData)
        .expect(201)
        .expect((res) => {
            const data = res.body.data;
            testToken = data.token;
            expect(data).toHaveProperty('token');
        })
        .end(done);
      });
    
    it('should reply error', (done) => {
        request(app.getHttpServer())
        .post(url)
        .set('Authorization', 'Bearer '+ testPK)
        .send(errorTestData)
        .expect(400)
        .end(done);
      });
  })

  describe('GET /tokens', () => {
    it('should reply success', (done) => {
        request(app.getHttpServer())
        .get(`${url}/${testToken}`)
        .set('Authorization', 'Bearer '+ testPK)
        .expect(200)
        .expect((res) => {
            const data = res.body.data.data.data;

            expect(data).toHaveProperty('card_number', Number(testData.card_number));
            expect(data).toHaveProperty('expiration_month', testData.expiration_month);
            expect(data).toHaveProperty('expiration_year', testData.expiration_year);
            expect(data).toHaveProperty('email', testData.email);
            expect(data).toHaveProperty('token', testToken);
        })
        .end(done);
      });
    
    it('should reply error', (done) => {
        request(app.getHttpServer())
        .get(`${url}/${errorToken}`)
        .set('Authorization', 'Bearer '+ testPK)
        .expect(500)
        .end(done);
      });
  })

  afterAll(async () => {
    await app.close();
  });
});