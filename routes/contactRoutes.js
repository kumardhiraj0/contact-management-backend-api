const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactWithId,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");



// router.route("/").get(getContact);
// router.route("/:id").get(getContactWithId);
// router.route("/").post(createContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

//other method when endpont is same then we can write like this basically nesting
//this validate token is used for all the route
router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactWithId).put(updateContact).delete(deleteContact);
module.exports = router;
