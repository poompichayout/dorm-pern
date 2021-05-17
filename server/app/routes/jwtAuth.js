const router = require('express').Router();
const pool = require('../config/db.config');


// ผู้ใช้สามารถสมัครสมาชิกได้
router.post('/register', async (req, res) => {
    try{
        /* destruct variable from req.body */
        const {password, firstname, lastname, gender, type, username} = req.body;

        /* check if user exist (if exists throw an error) */

        const user = await pool.query(`SELECT * FROM Tenant WHERE ssn=${password}`);
        if(user.rows.length !== 0) {
            return res.status(401).json({
                message:'User already exist'
            });
        }

        await pool.query(`INSERT INTO Tenant (
            ssn, firstname, lastname, sex, type
        ) VALUES (
            ${password},
            '${firstname}',
            '${lastname}',
            '${gender}',
            '${type}'
        );
        
        INSERT INTO ${type} (
            ${type}Id, SSN
        ) VALUES (
            ${username},
            ${password}
        );`)

        res.json({
            message: 'Registration Successful'
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
    
});

router.post('/login', async (req, res) => {
    try {
        const {password, username} = req.body;

        const student = await pool.query(`SELECT * FROM Student WHERE studentid=${username} AND ssn=${password}`);
        const staff = await pool.query(`SELECT * FROM Staff WHERE staffid=${username} AND ssn=${password}`);
        if(student.rows.length === 0 && staff.rows.length === 0) {
            return res.status(401).send('Invalid Username or password is incorrect');
        }
        
        // const user = student.rows.length === 0? staff:student;
        const userData = await pool.query(`SELECT * FROM Tenant where ssn=${password}`);
        const userInfo = userData.rows[0];

        // req.session.user = userInfo;

        res.json({
                message: "Authenticate Successful!",
                userInfo
        });

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500).json({message: 'Server Error'});
    }
})

module.exports = router;