const express = require('express')

const { getCourses,
    createCourses,
    getACourse,
    getLesson,
    getLessonContent } = require('../controller/courses-control')

const courseRoute = express.Router()

courseRoute.get('/courses', getCourses)
courseRoute.post('/create-course', createCourses)
courseRoute.get('/getACourse/:courses_id', getACourse)
courseRoute.get('/getLesson/:courses_id',getLesson)
courseRoute.get('/getLessonContent/:courses_id/:lesson_id', getLessonContent)

module.exports = courseRoute