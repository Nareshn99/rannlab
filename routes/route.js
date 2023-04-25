import express from 'express';
import { createStudent, login } from '../controllers/studentController.js';
import { teacherUploadFile } from '../controllers/fileController.js';
const router=express.Router();

router.post("/register",createStudent);
router.post("/login",login)

router.post("/file-upload",teacherUploadFile)

export default router;