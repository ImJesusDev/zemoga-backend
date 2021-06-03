import request from 'supertest';
import { app } from '../../app';
import DynamoClient from '../../utils/dynamo';

it('returns 400 with invalid firstName param', async () => {
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: 'https://my-photo.com',
      username: 'jesusD',
      firstName: '',
      lastName: 'Diaz',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      title: 'Full Stack Developer',
    })
    .expect(400);

  expect(DynamoClient).toHaveBeenCalledTimes(0);
});

it('returns 400 with invalid lastName param', async () => {
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: 'https://my-photo.com',
      username: 'jdiaz740',
      firstName: 'Jesus',
      lastName: '',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      title: 'Full Stack Developer',
    })
    .expect(400);

  expect(DynamoClient).toHaveBeenCalledTimes(0);
});

it('returns 400 with invalid title param', async () => {
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: 'https://my-photo.com',
      username: 'jdiaz740',
      firstName: 'Jesus',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      lastName: 'Diaz',
      title: '',
    })
    .expect(400);

  expect(DynamoClient).toHaveBeenCalledTimes(0);
});

it('returns 400 with invalid photo param', async () => {
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: '',
      username: 'jdiaz740',
      firstName: 'Jesus',
      lastName: 'Diaz',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      title: 'Full Stack Developer',
    })
    .expect(400);

  expect(DynamoClient).toHaveBeenCalledTimes(0);
});

it('returns 400 with invalid username param', async () => {
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: 'https://my-photo.com',
      username: '',
      firstName: 'Jesus',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      lastName: 'Diaz',
      title: 'Full Stack Developer',
    })
    .expect(400);

  expect(DynamoClient).toHaveBeenCalledTimes(0);
});

it('returns 400 with invalid description param', async () => {
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: 'https://my-photo.com',
      username: 'jdiaz740',
      firstName: 'Jesus',
      description: '',
      lastName: 'Diaz',
      title: 'Full Stack Developer',
    })
    .expect(400);

  expect(DynamoClient).toHaveBeenCalledTimes(0);
});

it('returns 200 with valid params', async () => {
  const mockFind = jest.fn();
  DynamoClient.prototype.find = mockFind;
  mockFind.mockReturnValue(
    Promise.resolve({
      photo: 'https://my-photo.com',
      username: 'jesusd',
      firstName: 'Jesus',
      lastName: 'Diaz',
      title: 'Full Stack Developer',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      userId: '4419dbaa-9b74-4f12-8b9d-3765c9e96b43',
    })
  );
  await request(app)
    .put('/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43')
    .send({
      photo: 'https://my-photo.com',
      username: 'jesusd',
      firstName: 'Jesus',
      lastName: 'Diaz',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      title: 'Full Stack Developer',
    })
    .expect(200);
  expect(mockFind).toHaveBeenCalledTimes(1);
});
