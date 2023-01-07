const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

let token = '';
let photoId = '';
const newPhoto = {
  title: 'photobaruu',
  caption: 'october pict',
  image_url: 'https://instagram.com/as1939',
};

beforeAll(async () => {
  const user = {
    username: 'userbaru123',
    email: 'userbaru@mail.com',
    password: '123',
  };

  await request(app).post('/users/register').send(user);

  let userLogin = await request(app).post('/users/login').send(user);
  token = userLogin.body.token;
});

// const createNewPhoto = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error('error oyy'));
//       resolve(request(app).post('/photos').send(newPhoto).set('token', token));
//     }, 2000);
//   });
// };

describe('POST /photos', () => {
  it('should send response with a 201 status code', (done) => {
    request(app)
      .post('/photos')
      .send(newPhoto)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        photoId = res.body.id;
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('caption');
        expect(res.body).toHaveProperty('image_url');
        expect(res.body).toHaveProperty('UserId');
        expect(res.body.title).toEqual(newPhoto.title);
        expect(res.body.caption).toEqual(newPhoto.caption);
        expect(res.body.image_url).toEqual(newPhoto.image_url);
        done();
      });
  });

  it('should send a response with a 401 status code, because not given a token ', (done) => {
    request(app)
      .post('/photos')
      .send(newPhoto)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message');
        done();
      });
  });
});

describe('GET all /photos', () => {
  it('should send response with a 200 status code', (done) => {
    request(app)
      .get('/photos')
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ id: photoId }),
            expect.objectContaining({ title: newPhoto.title }),
            expect.objectContaining({ caption: newPhoto.caption }),
            expect.objectContaining({ image_url: newPhoto.image_url }),
          ])
        );
        done();
      });
  });

  it('should send a response with a 401 status code, because not given a token ', (done) => {
    request(app)
      .get('/photos')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message');
        done();
      });
  });
});

describe('GET /photos/:id', () => {
  it('should send response with a 200 status code', (done) => {
    request(app)
      .get(`/photos/${photoId}`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toEqual(
          expect.objectContaining({ id: photoId }),
          expect.objectContaining({ title: newPhoto.title }),
          expect.objectContaining({ caption: newPhoto.caption }),
          expect.objectContaining({ image_url: newPhoto.image_url })
        );
        done();
      });
  });

  it('should send a response with a 401 status code, because not given a token ', (done) => {
    request(app)
      .get('/photos')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message');
        done();
      });
  });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete('Users', {});
});
