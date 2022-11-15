const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'Jknowledge-login-nodejs-login-21-10-22'

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "jknowledge"
});

const createUser = (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const user_role = req.body.user_role;
    const role_id = req.body.role_id;
    const school = req.body.school;
    const province = req.body.province;
    const expectation = req.body.expectation;
    const grade = req.body.grade;
    const parentJob = req.body.parentJob;
    const termCondition = req.body.termCondition;

    bcrypt.hash(password, saltRounds, (err, hashPassword) => {
        db.query("INSERT INTO users (phone, password, fname, lname, email, user_role, role_id) VALUES (?,?,?,?,?,?,?)",
            [phone, hashPassword, fname, lname, email, user_role, role_id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query("INSERT INTO users_meta (user_id, user_meta_key, user_meta_value) VALUES (?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?) "
                        , [result.insertId, 'โรงเรียน', school, result.insertId, 'จังหวัด', province, result.insertId, 'ความคาดหวัง', expectation, result.insertId, 'ระดับชั้น', grade, result.insertId, 'ข้อตกลงและเงื่อนไข', termCondition, result.insertId, 'อาชีพ', parentJob]
                        , (err, resmeta) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send(resmeta)
                                console.log(resmeta);
                            }
                        })
                }
            }

        );
    });
};

const Signin = (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE phone= ?", [phone],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err });
            }
            if (result.length == 0) {
                res.json({ status: 'error', message: 'ไม่พบเบอร์โทรศัพท์!' })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, isLogin) => {
                    if (isLogin) {
                        const token = jwt.sign({ phone: result[0].phone, user_id: result[0].user_id, role_id: result[0].role_id }, secret);
                        res.json({ status: 'ok', message: result, token })
                    } else {
                        res.json({ status: 'error', message: 'รหัสผ่านไม่ถูกต้อง' })
                    }
                });
            }
        })
}

const authToken = (req, res) => {
    try {
        const token = req.body.headers.Authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        res.send({ status: 'ok', decoded });
    } catch (err) {
        res.send({ status: 'error', message: err.message })
    }
}

const getUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};


const getAUser = (req, res) => {
    const user_id = req.params.user_id;
    db.query("SELECT * FROM users INNER JOIN j_user_role ON users.role_id=j_user_role.role_id WHERE user_id=?", user_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const getAUserMeta = (req, res) => {
    const user_id = req.params.user_id;
    db.query("SELECT * FROM users_meta WHERE user_id=?", user_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const updateAUser = (req,res) => {
    const user_id = req.body.user_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    db.query("UPDATE users SET fname = ? , lname = ? , email = ? WHERE user_id =?", [fname, lname, email, user_id], (err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
}

const updateUser = (req, res) => {
    const user_id = req.body.user_id;
    const role_id = req.body.role_id;
    db.query("UPDATE users SET role_id = ? WHERE user_id = ?",
        [role_id, user_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE user_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    Signin,
    authToken,
    getAUser,
    getAUserMeta,
    updateAUser
};