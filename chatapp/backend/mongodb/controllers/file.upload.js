import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
}).single("file");

const base64ToMulterMiddleware = (req, res, next) => {
  try {
    const base64File = req.body.file;

    if (!base64File) {
      return res
        .status(400)
        .json({ error: "Please provide base64 file data." });
    }

    const matches = base64File.match(
      /^data:(application\/\w+|image\/\w+|text\/\w+|video\/\w+);base64,(.+)$/
    );

    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 file data." });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const buffer = Buffer.from(base64Data, "base64");

    const fileExtension = mimeType.split("/")[1];
    const fileName = `file-${Date.now()}.${fileExtension}`;
    const tempPath = path.join("files", fileName);

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
    console.error(err);
    return res.status(500).json({ error: "Failed to process base64 file." });
  }
};

export const uploadImage = (req, res) => {
  console.log("Upload Files");

  base64ToMulterMiddleware(req, res, () => {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Failed to upload file." });
      }
      console.log("Uploading");

      res.status(200).json({
        path: req.file.path.replace(/\\/g, "/"),
      });
    });
  });
};
