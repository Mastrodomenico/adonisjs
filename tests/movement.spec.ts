import test from 'japa'
import supertest from 'supertest'
import Redis from '@ioc:Adonis/Addons/Redis'

//Afins de teste, excluo tudo no cache do redis relacionado à conta 2
Redis.del(`account:2`).then()
Redis.del(`account:3`).then()

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Movement', () => {
  test('create account One', async () => {
    await supertest(BASE_URL)
      .post('/accounts')
      .send({ name: 'Dwight Schrute', cpf: '53522626842' })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('create account Two', async () => {
    await supertest(BASE_URL)
      .post('/accounts')
      .send({ name: 'Michael Scott', cpf: '53522626843' })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('credit $1000 to One', async () => {
    await supertest(BASE_URL)
      .post('/movements/credit')
      .send({ account_id: '2', value: 1000 })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('credit $2000 to One', async () => {
    await supertest(BASE_URL)
      .post('/movements/credit')
      .send({ account_id: '2', value: 2000 })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('balance in redis account One should be $3000', async (assert) => {
    await supertest(BASE_URL)
      .get('/movements/account/2/balance')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.value, 3000)
      })
  })

  test('debit $1000 account One', async () => {
    await supertest(BASE_URL)
      .post('/movements/debit')
      .send({ account_id: '2', value: 1000 })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('balance in redis account One should be $2000', async (assert) => {
    await supertest(BASE_URL)
      .get('/movements/account/2/balance')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.value, 2000)
      })
  })

  test('debit $1000 account One, Should return error 422', async () => {
    await supertest(BASE_URL)
      .post('/movements/debit')
      .send({ account_id: '2', value: 3000 })
      .expect('Content-Type', /json/)
      .expect(422)
  })

  test('transfer $1000 account 2 to 3', async () => {
    await supertest(BASE_URL)
      .post('/movements/transfer')
      .send({ account_id_source: '2', account_id_destination: '3', value: 1000 })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('balance in redis account One should be $1000', async (assert) => {
    await supertest(BASE_URL)
      .get('/movements/account/2/balance')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.value, 1000)
      })
  })

  test('balance in redis account Two should be $1000', async (assert) => {
    await supertest(BASE_URL)
      .get('/movements/account/3/balance')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.value, 1000)
      })
  })

  test('balance in DB account One should be $1000', async (assert) => {
    await supertest(BASE_URL)
      .get('/accounts/2/movements')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.balance, 1000)
      })
  })

  test('balance in DB account Two should be $1000', async (assert) => {
    await supertest(BASE_URL)
      .get('/accounts/3/movements')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.balance, 1000)
      })
  })
})
