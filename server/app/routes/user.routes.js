const router = require('express').Router();
const pool = require('../config/db.config');

// ผู้ใช้สามารถอัพเดตข้อมูลได้
router.put('/update/account/:id', async (req, res) => {

    try {
        const {firstname, lastname, phone, gender} = req.body.params;
        const {id} = req.params;

        const newUser = await pool.query(`UPDATE Tenant 
            SET firstname='${firstname}', lastname='${lastname}', phoneNumber=${phone}, sex='${gender}'
            WHERE SSN=${id};`);

        res.json({message: "Successful Update!"});
    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    } 
});

// ผู้ใช้สามารถเรียกเอาข้อมูลห้องที่ว่างออกมาได้
router.get('/room/empty', async (req, res) => {

    const room = await pool.query(`SELECT * 
    FROM Room
    WHERE _status=TRUE;`);

    res.send(room.rows);
});

// ผู้ใช้สามารถตรวจสอบค่าใช้จ่ายได้
router.get('/checkbill', async (req, res) => {
    try {
        const {bname, roomid} = req.query;

        const data = await pool.query(`SELECT * FROM bill where bname='${bname}' AND roomid=${roomid}`);

        if(data.rows.length === 0) {
            return res.status(200).json({data: [], message: "You have no bill pay"});
        }

        res.json(data.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Can not get data'});
    }
    
})

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
    try {
        const { bname, roomid, ssn } = req.body;
        const room = await pool.query(`SELECT * FROM Room WHERE BName='${bname}' AND RoomId=${roomid}`);

        if(room.rows.length === 0)
            return res.status(200).send({message: 'Building Or Room Not Found!'});

        let lastContractIndex = await pool.query(`SELECT * FROM Contract ORDER BY contractno DESC LIMIT 1;`)
        lastContractIndex = lastContractIndex.rows[0].contractno;
        const { price } = room.rows[0];

        const contract = await pool.query(`
            INSERT INTO Contract VALUES (
                ${lastContractIndex+1}, '${bname}', ${roomid}, ${ssn}, NOW(), 
                (NOW()+ interval '30 day'), ${price}, 300, TRUE
            );

            UPDATE Tenant SET BName='${bname}', RoomId=${roomid}
            WHERE SSN=${ssn};

            UPDATE Room SET _status=(
                CASE
                    WHEN (SELECT COUNT(Tenant.SSN)
                            FROM Tenant
                            WHERE Tenant.BName='${bname}'
                            AND Tenant.RoomId=${roomid})
                    >= Room._roomer
                    THEN FALSE
                    ELSE TRUE
                END)
            WHERE Room.BName='${bname}' AND Room.RoomId=${roomid};
        `);

        res.json({message: 'Booking Successful'})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: error.message});
    }
});

// ผู้ใช้สามารถเปลี่ยนห้องพักได้
router.put('/update/room', async (req, res) => {
    try {
        const { oldbname, oldroomid, newbname, newroomid, ssn } = req.body;

        const room = await pool.query(`SELECT * FROM Room WHERE BName='${newbname}' AND RoomId=${newroomid}`);

        if(room.rows.length === 0)
            return res.status(200).send({message: 'Building Or Room Not Found!'});

        await pool.query(`
            UPDATE Tenant
            SET BName='${newbname}', RoomId=${newroomid}
            WHERE ssn=${ssn};

            UPDATE Room
            SET _status=true
            WHERE BName='${oldbname}' AND RoomId=${oldroomid};
        `)

        res.json({message: 'Update Successful!'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
});

// ผู้ใช้สามารถยกเลิกห้องพักได้
router.put('/cancel/room', async (req, res) => {
    try {
        const { bname, roomid, ssn } = req.body;

        await pool.query(`
            UPDATE Contract
            SET end_date=NOW(), status=FALSE
            WHERE BName='${bname}' AND roomid=${roomid} AND ssn=${ssn};

            UPDATE Tenant
            SET bname=NULL, RoomId=NULL
            WHERE ssn=${ssn};
        `)

        res.json({message: 'Cancel Room Successful!'});
    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
});

// ผู้ใช้สามารถตรวจสอบรายละเอียดของสัญญาตัวเองได้
router.get('/contract/:ssn', async (req, res) => {
    try {
        const {ssn} = req.params;

        const data = await pool.query(`
            SELECT *
            FROM Contract
            WHERE SSN=${ssn}
        `)

        res.json(data.rows);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
});

module.exports = router;