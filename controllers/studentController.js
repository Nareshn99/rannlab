import studentModel from "../models/studentModel.js";
import bcrypt from 'bcrypt';
import { isValidEmail, isValidPassword } from "../utils/validation.js";
import uploadFile from "../utils/aws.js";
import jwt from 'jsonwebtoken'

export const createStudent = async (req, res) => {
    try {

        let { FirstName,
            LastName,
            SchoolName,
            Email,
            Mobile,
            Password,
            PhotoOfTheStudents
        } = req.body;


        switch (true) {
            case !FirstName:
                return res.status(400).send({ status: false, message: "FirstName Is Mandatory " });
            case !LastName:
                return res.status(400).send({ status: false, message: "LastName Is Mandatory " });
            case !SchoolName:
                return res.status(400).send({ status: false, message: "SchoolName Is Mandatory " });
            case !Email:
                return res.status(400).send({ status: false, message: "Email Is Mandatory " });
            case !isValidEmail(Email):
                return res.status(400).send({ status: false, message: "Invalid Email" });
            case !Mobile:
                return res.status(400).send({ status: false, message: "Mobile Is Mandatory" });
            case !Password:
                return res.status(400).send({ status: false, message: "Password Is Mandatory" });
            case !isValidPassword(Password):
                return res.status(400).send({ status: false, message: "Weak Password,Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character" })

        }


        //validation for photo  and store image in AWS and store link of image in mongodb
        let photo = req.files;
        if (photo && photo.length > 0) {
            const url = await uploadFile(photo[0]);
            PhotoOfTheStudents = url
        } else {
            return res.status(400).send({ status: false, message: "Student Image Is Mandatory" });
        }


        // Check for the uniqueness of email and Mobile
        let student = await studentModel.find({ $or: [{ Email }, { Mobile }] })
        for (let key of student) {
            if (key.Email == Email.trim().toLowerCase()) {
                return res.status(409).send({ status: false, message: "Given Email is already taken" })
            }
            if (key.Mobile == Mobile) {
                return res.status(409).send({ status: false, message: "Given Mobile is already taken" })
            }
        }


    
        //bcrypt Password
        const hashedPassword = await bcrypt.hash(Password, 10)

        const data = await studentModel.create({
            FirstName,
            LastName,
            SchoolName,
            Email,
            Mobile,
            Password: hashedPassword,
            PhotoOfTheStudents
        });
        return res.status(201).send({ status: true, message: "Student Registered SuccessFully", data })
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({ status: false, message: "Getting Error During Student Registretion" })
    }
}




export const login = async (req, res) => {
    try {

        const { UserName, Password } = req.body;

        //validation for Require User Name And Password
        switch (true) {
            case !UserName:
                return res.status(400).send({ status: false, message: "UserName Is Mandatory " });
            case !Password:
                return res.status(400).send({ status: false, message: "Password Is Mandatory " });
        }

        //find Student from dataBase
        let student = await studentModel.findOne({ Mobile: UserName });
        if (!student) {
            return res.status(404).send({ status: false, message: "Student not found" });
        }

        let correctPass = await bcrypt.compare(Password, student.Password)
        if (!correctPass) {
            return res.status(400).send({ status: false, message: "Invalid Password" });
        }

        const data = jwt.sign({ userId: student._id }, process.env.SECRET, { expiresIn: 60 });

        return res.status(200).send({ status: true, message: "Student Login SuccessFully", token:data })
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({ status: false, message: "Getting Error During Student Login" })
    }
}


