const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactWithId,
} = require("../controllers/contactController");



// router.route("/").get(getContact);
// router.route("/:id").get(getContactWithId);
// router.route("/").post(createContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

//other method when endpont is same then we can write like this basically nesting
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactWithId).put(updateContact).delete(deleteContact);
module.exports = router;
