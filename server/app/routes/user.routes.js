const router = require('express').Router();
const pool = require('../config/db.config');

// ผู้ใช้สามารถอัพเดตข้อมูลได้
router.put('/update/:id', async (req, res) => {

    const data = req.body;
    const {id} = req.params;

    const newUser = await pool.query(`UPDATE Tenant 
        SET type=$1
        WHERE SSN=$2;`, [data.type, id]);

    res.send({message: "Successful Update!"});
});

// ผู้ใช้สามารถเรียกเอาข้อมูลห้องที่ว่างออกมาได้
router.get('/room/empty', async (req, res) => {

    const room = await pool.query(`SELECT * 
    FROM Room
    WHERE _status=TRUE;`);

    res.send(room.rows);
});

// ผู้ใช้สามารถแจ้งความประสงค์ได้
router.post('/request', async (req, res) => {

    try {
        const {ssn, detail} = req.body;

        var id = await pool.query('SELECT * FROM Inform_service ORDER BY serviceno DESC LIMIT 1;')
        id = id.rows[0].serviceno;

        await pool.query(`
            INSERT INTO service
            VALUES (
                ${id+1},
                ${ssn},
                NOW()::timestamp,
                False
            );
            
            INSERT INTO inform_service
            VALUES (
                ${id+1},
                ${ssn}
            );

            INSERT INTO Service_Detail
            VALUES (
                ${id+1}, ${ssn}, '${detail}'
            );
        `)

        res.json({
            message: 'Request send successfully'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'can not post'});
    }
});

// ผู้ใช้สามารถจองห้องพักได้
router.post('/booking_room', async (req, res) => {
    const {
        BName, RoomId, SSN, start_date, end_date, price, deposit, status
    } = req.body;

    try {
        const room = await pool.query(`SELECT * FROM Room WHERE BName=${BName} AND RoomId=${RoomId}`);

        if(room.rows.length === 0)
            return res.sendStatus(500).send({message: 'Room Not Found!'});

        const contract = await pool.query(`
            INSERT INTO Contract VALUES (
                ${BName}, ${RoomId}, ${SSN}, ${start_date}, 
                ${end_date}, ${price}, ${deposit}, ${status}
            );

            UPDATE Tenant SET BName=${BName}, RoomId=${RoomId}
            WHERE SSN=${SSN};

            UPDATE Room SET status=(
                CASE
                    WHEN (SELECT COUNT(Tenant.SSN)
                            FROM Tenant
                            WHERE Tenant.BName=${BName}
                            AND Tenant.RoomId=${RoomId})
                    >= Room._roomer
                    THEN FALSE
                    ELSE TRUE
                END)
            WHERE Room.BName=${BName} AND Room.RoomId=${RoomId};
        `);
    } catch (error) {
        return res.sendStatus(500).send({message: error.message});
    }
});


module.exports = router;