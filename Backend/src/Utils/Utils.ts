import * as Multer from "multer";
import * as fs from "fs";
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "./src/upload";
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, "./src/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export class Utils {
  public multer = Multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10, // 10 MB limit (adjust as needed)
    },
  }).single("EmployeeImage");
}
