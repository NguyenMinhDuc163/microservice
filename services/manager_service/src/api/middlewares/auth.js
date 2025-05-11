// src/api/middlewares/auth.js
const { ValidateSignature } = require('../../utils');

module.exports = async (req, res, next) => {
    // Tạm thời bỏ qua xác thực để test API trong giai đoạn phát triển
    console.log('Auth check bypassed for development');
    return next();

    // Mã gốc (sẽ kích hoạt lại khi đã sẵn sàng)
    // const isAuthorized = await ValidateSignature(req);
    // if (isAuthorized) {
    //     return next();
    // }
    // return res.status(403).json({ message: 'Not Authorized' });
}