import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@abc.com',
        password: bcrypt.hashSync('12456', 10),
        isAdmin: true,
    },
    {
        name: 'Kunal Shokeen',
        email: 'kunal@abc.com',
        password: bcrypt.hashSync('12456', 10),
        isAdmin: false,
    },
    {
        name: 'Tarun Pal',
        email: 'tarun@abc.com',
        password: bcrypt.hashSync('12456', 10),
        isAdmin: false,
    }
];

export default users;