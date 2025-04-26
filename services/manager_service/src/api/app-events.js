// src/api/app-events.js
const ManagerService = require("../services/manager-service");

module.exports = (app) => {
    const service = new ManagerService();
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log("============= Manager Service ================");
        console.log(payload);
        res.json(payload);
    });
}