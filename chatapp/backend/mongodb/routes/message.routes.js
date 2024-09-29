import express from "express";
import { getMessage, newMessage, setDelivered, setSeen, uploadFile } from "../controllers/message.controller.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = ''
        // if (req.body.type === 'media') {
        //     dir = path.join("files", 'media');
        // } else if (req.body.type === 'document') {
        //     dir = path.join("files", 'document');
        // } else if (req.body.type === 'voice') {
        //     dir = path.join("files", 'voice');
        // } else {
        //     dir = path.join("files", 'garbage');
        // }
        dir = path.join("files");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


router.post("/send", newMessage);
router.post("/upload", upload.single('text'), uploadFile)
router.get("/get/:id", getMessage);
router.post("/update-delivered", setDelivered)
router.post("/update-seen", setSeen)

export default router;