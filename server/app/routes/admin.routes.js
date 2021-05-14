const router = require('express').Router();
const pool = require('../config/db.config');

// แอดมินสามารถดูข้อมูลผู้ใช้ทั้งหมดได้
router.get('/getall', async (req, res) => {
    const allUsers = await pool.query('SELECT * FROM tenant;');

    res.send(allUsers.rows);
});

// แอดมินสามารถดึงข้อมูลผู้ใช้ แยกตามประเภทได้
router.get('/get/:type', async (req, res) => {
    const user = await pool.query(`SELECT * FROM tenant
        WHERE type=$1`, [req.params.type]);

    res.send(user.rows);
});

// แอดมินสามารถลบข้อมูลทั้งหมดในตาราง tenant student staff ได้
// สำหรับ development เท่านั้น
router.delete('/delete/all', async (req, res) => {
    const deleteAll = await pool.query(`
        DELETE FROM student;
        DELETE FROM staff;
        DELETE FROM tenant;
    `);

    res.send({message: 'Delete Successful!'});
});

router.get('/getallroom', async (req, res) => {
    const data = await pool.query(`
        SELECT * FROM Room;
    `);

    console.log('Fetch room data');
    res.send(data.rows);
})

router.get('/getallroom/:bool', async (req, res) => {
    const {bool} = req.params;
    const data = await pool.query(`
        SELECT * FROM Room WHERE _status=${bool};
    `);

    res.send(data.rows);
})

module.exports = router;