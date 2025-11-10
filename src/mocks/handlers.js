import { http, HttpResponse } from 'msw';

export const users = [];

export const handlers = [
  http.post('/api/register', async ({ request }) => {
    console.log(users);
    const body = await request.json();
    const { personal_number } = body;

    if (users.find((u) => u.personal_number === personal_number)) {
      return HttpResponse.json({ message: 'Пользователь с таким номером уже существует' }, { status: 400 });
    }

    users.push({ ...body });
    console.log('🆕 Зарегистрирован пользователь:', body);
    return HttpResponse.json({ message: 'Регистрация прошла успешно' });
  }),

  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    const { personal_number, password } = body;
    console.log('body', body);
    console.log('personal_number', personal_number, 'password', password);

    const user = users.find((u) => u.personal_number === personal_number && u.password === password);
    if (!user) {
      return HttpResponse.json({ message: 'Неверный личный номер или пароль' }, { status: 401 });
    }

    const fakeToken = `jwt-${Math.random().toString(36).substring(2, 15)}`;

    return HttpResponse.json({
      token: fakeToken,
      user: {
        personal_number: user.personal_number,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address || 'г. Минск, ул. Победителей, 10',
        fullName: user.fullName || 'Александр Иванов',
      },
    });
  }),
];
