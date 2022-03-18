import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Account', () => {
  test('list', async () => {
    await supertest(BASE_URL).get('/accounts').expect(200)
  })

  test('Create Account Jim Halpert', async () => {
    await supertest(BASE_URL)
      .post('/accounts')
      .send({ name: 'Jim Halpert', cpf: '63522626840' })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('Create Account with same CPF', async () => {
    await supertest(BASE_URL)
      .post('/accounts')
      .send({ name: 'Jim Halpert', cpf: '63522626840' })
      .expect('Content-Type', /json/)
      .expect(422)
  })

  test('Find Account', async (assert) => {
    await supertest(BASE_URL)
      .get('/accounts/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.cpf, '63522626840')
        assert.equal(response.body.name, 'Jim Halpert')
      })
  })

  test('Update Account', async () => {
    await supertest(BASE_URL)
      .put('/accounts/1')
      .send({ name: 'Pam Beesly', cpf: '53522626840' })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('Find account updated, it should be Pam Beesly with 53522626840', async (assert) => {
    await supertest(BASE_URL)
      .get('/accounts/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.cpf, '53522626840')
        assert.equal(response.body.name, 'Pam Beesly')
      })
  })

  test('Delete Account', async () => {
    await supertest(BASE_URL).delete('/accounts/1').expect(200)
  })

  test('Find account deleted, it should return 404', async () => {
    await supertest(BASE_URL).get('/accounts/1').expect(404)
  })
})
