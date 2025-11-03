import { http, HttpResponse } from 'msw';

const users = [];

export const handlers = [
  http.post('/api/register', async ({ request }) => {
    console.log(users);
    const body = await request.json();
    const { email } = body;

    if (users.find((u) => u.email === email)) {
      return HttpResponse.json({ message: 'Пользователь уже существует' }, { status: 400 });
    }

    users.push({ ...body });
    console.log('🆕 Зарегистрирован пользователь:', body);
    return HttpResponse.json({ message: 'Регистрация прошла успешно' });
  }),

  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;
    console.log('body', body);
    console.log('email', email, 'password', password);

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return HttpResponse.json({ message: 'Неверный email или пароль' }, { status: 401 });
    }

    const fakeToken = `jwt-${Math.random().toString(36).substring(2, 15)}`;

    return HttpResponse.json({
      token: fakeToken,
      user: {
        pinfl: user.pinfl,
        email: user.email,
        password: user.password,
        phone: user.phone,
      },
    });
  }),
];
