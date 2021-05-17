const router = require('express').Router();
const pool = require('../config/db.config');

// แอดมินสามารถปรับราคาห้องพักได้
router.put('/update/price', async (req, res) => {
    try {
        const { bname, roomid, price } = req.body;

        await pool.query(`
            UPDATE Room
            SET price=${price}
            WHERE bname='${bname}' AND roomid=${roomid};
        `);

        res.json({message: 'Update Price successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
})

// แอดมินสามารถแจ้งรายการชำระเงินได้
router.post('/addbill', async (req, res) => {
    try {
        const { bname, roomid, due_date, costname} = req.body;

        var id = await pool.query('SELECT * FROM Bill ORDER BY billid DESC LIMIT 1;')
        id = id.rows[0].billid;

        await pool.query(`
            INSERT INTO Bill
            VALUES (${id+1}, '${bname}', ${roomid}, CAST('${due_date}' AS date), FALSE, 0, '${costname}');
        `);

        res.json({message: 'Add bill successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
})

// แอดมินสามารถดึงข้อมูลคนที่อยู่ในห้องพักนั้นได้
router.get('/:bname/:roomid', async (req, res) => {
    try {
        const { bname, roomid } = req.params;

        const data = await pool.query(`SELECT * FROM Tenant WHERE bname='${bname}' AND roomid=${roomid}`);

        res.json(data.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
})

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

    res.send(data.rows);
})

router.get('/room', async (req, res) => {
    const { status } = req.query;
    const data = await pool.query(`
        SELECT * FROM Room WHERE _status=${status};
    `);

    res.send(data.rows);
})

module.exports = router;