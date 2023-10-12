const express = require('express');
const userRouter = require('./../controllers/userController');
const router = express.Router(); // middleware

// 2) ROUTE HANDLER refactore routes

// 3) ROUTES responding to url parameters

router.route('/').get(userRouter.getAllUsers).post(userRouter.createUser);
router
  .route('/:id')
  .get(userRouter.getUser)
  .patch(userRouter.updateUser)
  .delete(userRouter.deleteUser);

module.exports = router;
