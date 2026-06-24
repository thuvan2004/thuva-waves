import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Driver route working!' });
});

export default router;