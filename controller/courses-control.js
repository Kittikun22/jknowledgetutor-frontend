const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "jknowledge"
});

// const db = mysql.createConnection({
//     user: "jknowled_react",
//     host: "localhost",
//     password: "jknow2022",
//     database: "jknowled_react"
// });


const getLesson = (req, res) => {
    const courses_id = req.params.courses_id;
    db.query("SELECT lesson_id, lesson_name FROM j_courses_lesson WHERE courses_id=?", courses_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
}

const getLessonContent = (req, res) => {
    const courses_id = req.params.courses_id;
    const lesson_id = req.params.lesson_id;
    db.query("SELECT * FROM j_courses_lesson WHERE courses_id=? AND lesson_id=?", [courses_id, lesson_id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
}


const getACourse = (req, res) => {
    const courses_id = req.params.courses_id;
    db.query("SELECT * FROM j_courses WHERE courses_id = ?", courses_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
}


const getCourses = (req, res) => {
    db.query("SELECT * FROM j_courses", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

const createCourses = (req, res) => {
    const courses_name = req.body.courses_name;
    const courses_access = req.body.courses_access;
    const courses_detail = req.body.courses_detail;
    const courses_vdo = req.body.courses_vdo;
    const courses_pic = req.body.courses_pic;

    db.query("INSERT INTO j_courses(courses_name,courses_access,courses_detail,courses_vdo,courses_pic) VALUES (?,?,?,?,?)",
        [courses_name, courses_access, courses_detail, courses_vdo, courses_pic],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Course Created!!")
            }
        })
};

module.exports = {
    getCourses,
    createCourses,
    getACourse,
    getLesson,
    getLessonContent
};