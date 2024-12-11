import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /movements/validation - should validate movements', () => {
    return request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        "movements": [
          { "id": 1, "date": "2024-12-01T00:00:00.000Z", "wording": "Dépot", "amount": 1000 },
          { "id": 2, "date": "2024-12-02T00:00:00.000Z", "wording": "Abonnement Free", "amount": -50 },
          { "id": 3, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
        ],
        "balances": [
          { "date": "2024-12-01T00:00:00.000Z", "balance": 1000 },
          { "date": "2024-12-02T00:00:00.000Z", "balance": 950 },
          { "date": "2024-12-03T00:00:00.000Z", "balance": 900 }
        ]
      })
      .expect(202)
      .expect({ message: 'Accepted' });
  });

  it('POST /movements/validation - should return 1 balance_mismatch error', () => {
    return request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        "movements": [
          { "id": 1, "date": "2024-12-01T00:00:00.000Z", "wording": "Dépot", "amount": 1000 },
          { "id": 2, "date": "2024-12-02T00:00:00.000Z", "wording": "Abonnement Free", "amount": -50 },
          { "id": 3, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
        ],
        "balances": [
          { "date": "2024-12-01T00:00:00.000Z", "balance": 1000 },
          { "date": "2024-12-02T00:00:00.000Z", "balance": 950 },
          { "date": "2024-12-03T00:00:00.000Z", "balance": 910 }
        ]
      })
      .expect(400)
      .expect({
        "message": "Validation failed",
        "reasons": [
          {
            "type": "balance_mismatch",
            "details": "Balance mismatch on 2024-12-03T00:00:00.000Z: expected 910"
          }
        ]
      });
  });

  it('POST /movements/validation - should return 2 balance_mismatch error', () => {
    return request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        "movements": [
          { "id": 1, "date": "2024-12-01T00:00:00.000Z", "wording": "Dépot", "amount": 1000 },
          { "id": 2, "date": "2024-12-02T00:00:00.000Z", "wording": "Abonnement Free", "amount": -50 },
          { "id": 3, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
        ],
        "balances": [
          { "date": "2024-12-01T00:00:00.000Z", "balance": 1000 },
          { "date": "2024-12-02T00:00:00.000Z", "balance": 940 },
          { "date": "2024-12-03T00:00:00.000Z", "balance": 910 }
        ]
      })
      .expect(400)
      .expect({
        "message": "Validation failed",
        "reasons": [
            {
                "type": "balance_mismatch",
                "details": "Balance mismatch on 2024-12-02T00:00:00.000Z: expected 940"
            },
            {
                "type": "balance_mismatch",
                "details": "Balance mismatch on 2024-12-03T00:00:00.000Z: expected 910"
            }
        ]
    });
  });

  it('POST /movements/validation - should return 1 duplicate_operations error', () => {
    return request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        "movements": [
          { "id": 1, "date": "2024-12-01T00:00:00.000Z", "wording": "Dépot", "amount": 1000 },
          { "id": 2, "date": "2024-12-02T00:00:00.000Z", "wording": "Abonnement Free", "amount": -50 },
          { "id": 3, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
          { "id": 4, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
        ],
        "balances": [
          { "date": "2024-12-01T00:00:00.000Z", "balance": 1000 },
          { "date": "2024-12-02T00:00:00.000Z", "balance": 950 },
        ]
      })
      .expect(400)
      .expect({
        "message": "Validation failed",
        "reasons": [
            {
                "type": "duplicate_operations",
                "details": "Duplicate operations detected: for ID 4, Freebox at 2024-12-03T00:00:00.000Z"
            }
        ]
    });
  });

  it('POST /movements/validation - should return 1 duplicate_operations error', () => {
    return request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        "movements": [
          { "id": 1, "date": "2024-12-01T00:00:00.000Z", "wording": "Dépot", "amount": 1000 },
          { "id": 2, "date": "2024-12-02T00:00:00.000Z", "wording": "Abonnement Free", "amount": -50 },
          { "id": 3, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
          { "id": 4, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
        ],
        "balances": [
          { "date": "2024-12-01T00:00:00.000Z", "balance": 1000 },
          { "date": "2024-12-02T00:00:00.000Z", "balance": 950 },
        ]
      })
      .expect(400)
      .expect({
        "message": "Validation failed",
        "reasons": [
            {
                "type": "duplicate_operations",
                "details": "Duplicate operations detected: for ID 4, Freebox at 2024-12-03T00:00:00.000Z"
            }
        ]
    });
  });

  it('POST /movements/validation - should return 1 balance_mismatch and 1 duplicate_operations errors', () => {
    return request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        "movements": [
          { "id": 1, "date": "2024-12-01T00:00:00.000Z", "wording": "Dépot", "amount": 1000 },
          { "id": 2, "date": "2024-12-02T00:00:00.000Z", "wording": "Abonnement Free", "amount": -50 },
          { "id": 3, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
          { "id": 4, "date": "2024-12-03T00:00:00.000Z", "wording": "Freebox", "amount": -50 },
        ],
        "balances": [
          { "date": "2024-12-01T00:00:00.000Z", "balance": 1000 },
          { "date": "2024-12-02T00:00:00.000Z", "balance": 950 },
          { "date": "2024-12-03T00:00:00.000Z", "balance": 900 }
        ]
      })
      .expect(400)
      .expect({
        "message": "Validation failed",
        "reasons": [
            {
                "type": "balance_mismatch",
                "details": "Balance mismatch on 2024-12-03T00:00:00.000Z: expected 900"
            },
            {
                "type": "duplicate_operations",
                "details": "Duplicate operations detected: for ID 4, Freebox at 2024-12-03T00:00:00.000Z"
            }
        ]
    });
  });

});


