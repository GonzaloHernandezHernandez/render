const express = require('express')
const QuestionService = require('../services/questionService')

function questionsApi(app,db) {
    const router = express.Router()
    app.use('/questions', router)

    const questionService = new QuestionService(db)

    router.get('/', async (req, res, next) => {
        try {
            const questions = await questionService.getQuestions()
            res.status(200).json(
                {
                    data: questions,
                    message: 'Question array got succesfully'
                }
            )
        } catch (err) {
            console.error({ error: err })
        }
    })

    router.get('/:id', async (req, res, next) => {
        try {
            const id = req.params;
            const question = await questionService.getQuestionById(id);

            if (!question) {
                return res.status(404).json({
                    message: 'Question with id ' + id + ' not found'
                })
            }

            res.status(200).json({
                data: question,
                message: 'Question got successfully',
            });
        } catch (err) {
            console.error({ error: err });
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    })

    router.post('/', async (req, res, next) => {
        try {
            const {question, image, correctAnswer, incorrectAnswers} = req.body
            const newQuestion = {question, image, correctAnswer, incorrectAnswers}
            const result = await questionService.addQuestion(newQuestion)
            res.status(200).json({
                message: 'Question added succesfully',
                data: result
            })
        }catch(err){
            console.error({ error: err });
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    })

    router.put('/:id', async (req, res, next) => {
        try{
            const id = req.params
            const {question, image, correctAnswer, incorrectAnswers} = req.body
            const updatedQuestion = {question, image, correctAnswer, incorrectAnswers}
            const resultQuestion = await questionService.updateQuestion(id, updatedQuestion)

            if (resultQuestion) {
                res.status(200).json({
                    message: 'Question updated successfully',
                    data: updatedQuestion
                });
            } else {
                res.status(404).json({
                    message: 'Question with id ' + id + ' not found'
                });
            }

        }catch(err){
            console.error({error: err})
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    })

    router.delete('/:id', async (req, res, next) => {
        try{
            const id = req.params
            const result = await questionService.deleteQuestion(id)

            if (result) {
                res.status(200).json({
                    message: 'Queston deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Question not found'
                });
            }
        }catch (err) {
            console.error({ error: err });
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    })

}

module.exports = questionsApi