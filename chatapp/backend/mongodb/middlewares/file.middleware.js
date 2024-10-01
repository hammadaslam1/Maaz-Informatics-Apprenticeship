import multer from "multer";
import path from "path";
import fs from "fs";

export const base64ToMulterMiddleware = (req, res, next) => {
  try {
    // console.log(req.body);
    
    const base64File = req.body.file;
    if (!base64File) {
      return res
        .status(400)
        .json({ error: "Please provide base64 file data." });
    }
    // console.log(base64File);
    
    const matches = base64File.match(
      /^data:(application\/\w+|image\/\w+|text\/\w+|audio\/\w+|video\/\w+);base64,(.+)$/
    );
    // console.log(matches);
    
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 file data." });
    }
    console.log('ok');
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");
    const fileExtension = mimeType.split("/")[1];
    const fileName = `file-${Date.now()}.${fileExtension}`;
    const tempPath = path.join("files");

    fs.writeFileSync(tempPath, buffer);
    req.file = {
      fieldname: "file",
      originalname: fileName,
      mimetype: mimeType,
      path: tempPath,
      buffer: buffer,
    };
    
    next();
  } catch (err) {
    return res.status(500).json({ error: "Failed to process base64 file." });
  }
};