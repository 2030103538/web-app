const multer = require('multer');
const path = require('path');

function uploadimg(up_path) {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,up_path)
        },
        filename: function (req, file, cb) {

            let fileArr = file.originalname.split('.');
            let ext = fileArr[fileArr.length - 1];

            let times = new Date();
            times = times.getTime();

            let newName = `${times}.${ext}`;
            cb(null,newName);
        }

    });
    return multer({ storage })
}

const admin_img = uploadimg(path.join(__dirname,'../../public/images/admin'));

module.exports = {
    admin_img
};