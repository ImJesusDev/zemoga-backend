import request from 'supertest';
import { app } from '../../app';
import DynamoClient from '../../utils/dynamo';

it('returns the user profile', async () => {
  const mockFind = jest.fn();
  DynamoClient.prototype.find = mockFind;
  mockFind.mockReturnValue(
    Promise.resolve({
      photo: 'https://my-photo.com',
      username: 'jesusd',
      firstName: 'Jesus',
      lastName: 'Diaz',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      title: 'Full Stack Developer',
      userId: '4419dbaa-9b74-4f12-8b9d-3765c9e96b43',
    })
  );
  const response = await request(app)
    .get(`/users/4419dbaa-9b74-4f12-8b9d-3765c9e96b43`)
    .send()
    .expect(200);
  expect(response.body.firstName).toEqual('Jesus');

  expect(mockFind).toHaveBeenCalledTimes(1);
});
