const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrlAlamo = require('../controllers/alamo');

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
  .route('/location/:locationid/review/new')
  .get(ctrlLocations.addReview)
  .post(ctrlLocations.doAddReview);

/* bobs pages */
router.get('/input', ctrlOthers.input);

/* Other pages */
router.get('/about', ctrlOthers.about);

router
  .route('/dataAdd')
  .get (ctrlAlamo.addData)
  .post (ctrlAlamo.doAddData);

/* file uploader */
router
  .get('/upload', ctrlAlamo.uploader);
 
 module.exports = router;
