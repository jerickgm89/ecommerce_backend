const express = require('express')

const { 
    createCommentsControllers,
    getAllCommentsControllers,
    updateCommentsControllers,
    getCommentsByIdControllers,
    deleteCommentsControllers,
    deactivateCommentControllers,
    restoreCommentControllers,
    getInactiveCommentsControllers,
    reportCommentControllers
 } = require('../controllersComments/commentsControllers')

const router = express.Router()

router.post('/' , createCommentsControllers)
router.get('/deactived', getInactiveCommentsControllers)
router.get('/', getAllCommentsControllers)
router.get('/:id', getCommentsByIdControllers)
router.put('/:id', updateCommentsControllers)
router.delete('/:id', deleteCommentsControllers)
router.delete('/deactive/:id', deactivateCommentControllers )
router.delete('/restore/:id', restoreCommentControllers)
router.put('/report/:id', reportCommentControllers)
module.exports = router;