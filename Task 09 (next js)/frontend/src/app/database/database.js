import mysql from 'mysql2/promise';

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})

// database.connect(err => {
//     if (err) {
//         console.error('Error connecting to the database:', err)
//         return
//     } else {
//         console.log('Connected to the database successfully!')
//     }
// })

export default database;