// backend/Routers/Transactions.js
import express from 'express';
import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController } from '../controllers/transactionController.js';
import { authenticateUser } from '../middleware/authenticateUser.js'; // Ensure user authentication

const router = express.Router();
router.use(authenticateUser); // Apply authentication middleware

router.route("/addTransaction").post(addTransactionController);
router.route("/getTransaction").post(getAllTransactionController);
router.route("/deleteTransaction/:id").delete(deleteTransactionController);
router.route('/updateTransaction/:id').put(updateTransactionController);

export default router;
