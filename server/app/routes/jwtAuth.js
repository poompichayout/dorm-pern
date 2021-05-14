const router = require('express').Router();
const pool = require('../config/db.config');
const jwtGenerator = require('../config/jwtGenerator');


// ผู้ใช้สามารถสมัครสมาชิกได้
router.post('/register', async (req, res) => {
    try{
        /* destruct variable from req.body */
        const {ssn, firstname, lastname, sex, type, id} = req.body;

        /* check if user exist (if exists throw an error) */

        const user = await pool.query(`SELECT * FROM Tenant WHERE ssn=${ssn}`);
        if(user.rows.length !== 0) {
            return res.sendStatus(401).send('User already exist');
        }

        const newUser = await pool.query(`INSERT INTO Tenant (
            ssn, firstname, lastname, sex, type
        ) VALUES (
            '${ssn}',
            '${firstname}',
            '${lastname}',
            '${sex}',
            '${type}'
        ) RETURNING *;
        
        INSERT INTO ${type} (
            ${type}Id, SSN
        ) VALUES (
            '${id}',
            '${ssn}'
        ) RETURNING *;`);

        const token = jwtGenerator(newUser[1].rows[0].id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500).json({message: 'Server Error'});
    }
    
});

router.post('/login', async (req, res) => {
    try {
        const {password, username} = req.body;

        const student = await pool.query(`SELECT * FROM Student WHERE studentid=${username} AND ssn=${password}`);
        const staff = await pool.query(`SELECT * FROM Staff WHERE staffid=${username} AND ssn=${password}`);
        if(student.rows.length === 0 && staff.rows.length === 0) {
            console.log('Invalid Username');
            return res.sendStatus(401).send('Invalid Username or password is incorrect');
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