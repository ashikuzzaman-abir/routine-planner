import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';

const root = `http://localhost`;
const port = process.env.PORT || 5000;
const app = `${root}:${port}/api`;

describe('Auth Testing', () => {
  test('login testing', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'johndoe@gmail.com',
        password: '11223344',
      })
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body.token).toBeTruthy();
  });
  test('register user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'john doe master',
        email: 'johndoemaster@gmail.com',
        password: '11223344',
        preference: {
          learningObjective: 'MERN',
          availableStudyTime: 6,
        },
      });
    expect(res.status).toBe(201);
    const deleteRes = await request(app)
      .delete(`/users/${res.body.user._id}`)
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(deleteRes.status).toBe(200);
  });
});

describe('Routines test ', () => {
  test('Create routine', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'john doe master',
        email: 'johndoemaster@gmail.com',
        password: '11223344',
        preference: {
          learningObjective: 'MERN',
          availableStudyTime: 6,
        },
      });
    expect(res.status).toBe(201);

    const routineRes = await request(app)
      .post('/routine')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${res.body.token}`)
      .send({
        name: 'routine test',
        description: 'test routine initiated',
      });
    expect(routineRes.status).toBe(201);

    const deleteRoutine = await request(app)
      .delete(`/routine/${routineRes.body.doc._id}`)
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(deleteRoutine.status).toBe(200);

    const deleteUser = await request(app)
      .delete(`/users/${res.body.user._id}`)
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(deleteUser.status).toBe(200);
  });
  test('Get All Routines', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'john doe master',
        email: 'johndoemaster@gmail.com',
        password: '11223344',
        preference: {
          learningObjective: 'MERN',
          availableStudyTime: 6,
        },
      });
    expect(res.status).toBe(201);

    const routineRes = await request(app)
      .post('/routine')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${res.body.token}`)
      .send({
        name: 'routine test',
        description: 'test routine initiated',
      });
    expect(routineRes.status).toBe(201);

    const getRoutines = await request(app)
      .get('/routine')
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(getRoutines.status).toBe(200);

    const deleteRoutine = await request(app)
      .delete(`/routine/${routineRes.body.doc._id}`)
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(deleteRoutine.status).toBe(200);

    const deleteUser = await request(app)
      .delete(`/users/${res.body.user._id}`)
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(deleteUser.status).toBe(200);
  });
});
