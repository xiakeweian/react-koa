const Router = require("koa-router");
const router = new Router();
const campaign_controller = require("./../../app/controllers/campaign_controller");

router.get("/campaign/list", campaign_controller.fetchList);
router.post("/campaign/create", campaign_controller.create);
router.get('/campaign/detail',campaign_controller.getCampaignDetail)
// router.delete('/campaign/create', campaign_controller.create)
router.get('/cmc-main-campaign/id',campaign_controller.getCampaignId)
router.delete('/campaign/delete',campaign_controller.deleteCampaign)

module.exports = router;
