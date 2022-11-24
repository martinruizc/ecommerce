import bcrypt from 'bcryptjs'

export const users = [
  {
    first_name: 'Admin User',
    last_name: 'Admin User',
    email: 'admin@swimfast.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true
  },

  {
    first_name: 'Martin',
    last_name: 'Ruiz',
    email: 'martinyoruiz@gmail.com',
    password: bcrypt.hashSync('12345', 10)
  },

  {
    first_name: 'Andrea',
    last_name: 'Guzmán ',
    email: 'andreaguz@yahoo.com',
    password: bcrypt.hashSync('12345', 10)
  },

]