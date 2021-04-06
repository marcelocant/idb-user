
const { expect } = require('@jest/globals')

const users = require('../app/controllers/UserController')

jest.mock('../app/controllers/UserController');

test('Checa usuários', () => {
    const result = users;
    expect(result).toBeTruthy();
})

