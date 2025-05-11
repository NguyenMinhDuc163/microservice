
const NotificationService = require("../services/notification-service");

module.exports = (app) => {
    const service = new NotificationService();
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body;

        
        service.SubscribeEvents(payload);

        console.log("============= Notification ================");
        console.log(payload);
        res.json(payload);
    });
}