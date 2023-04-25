import fileModel from "../models/fileModel.js";
import uploadFile from "../utils/aws.js";


//File upload api for teacher
export const teacherUploadFile = async (req, res) => {
    try {
        let file = req.files;
        if (file && file.length > 0) {
            const url = await uploadFile(file[0]);
            const data = await fileModel.create({ File: url });
            return res.status(201).send({ status: true, message: "File Upload SuccessFully", data })
        } else {
            return res.status(400).send({ status: false, message: "File Is Mandatory For Upload" });
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({ status: false, message: "Getting Error During File Uploading" })
    }

}