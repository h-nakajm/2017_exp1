var express = require( 'express' );
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
// MongoDB用ファイルを指定
var collection = require( '../mongo_exp2' );
var Participants = 'participants';
var Results = 'results';
var Ad_clicked = 'ad_clicked';
var Questionnaire = 'questionnaire';
// var Finish = 'finish';
var Count = 'count';
var Blist = 'blist';
var Rejected = 'rejected';

// For Cross Origin
router.all( '/*', function ( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

// POST insert data
router.post( '/participants', function ( req, res ) {
  var num = collection(Count).find();
  collection(Blist)
    .find({id: req.body.id})
    .count()
    .then(function(count) {
      if(count == 0){
        collection(Participants).insertOne( req.body ).then(function(r) {
          // nothing to do.
        });
        res.send("OK");
      } else {
        collection(Rejected).insertOne( req.body ).then(function(r) {
          // nothing to do.
        });
        res.send("NG");
      }
    });

} );

router.post( '/results', function ( req, res ) {
  collection(Results).insertOne( req.body ).then(function(r) {
    res.send( r );
  });
} );

router.post( '/ad_clicked', function ( req, res ) {
  collection(Ad_clicked).insertOne( req.body ).then(function(r) {
    res.send( r );
  });
} );

router.post( '/questionnaire', function ( req, res ) {
  collection(Questionnaire).insertOne( req.body ).then(function(r) {
    res.send( r );
  });
} );

router.post( '/finish', function ( req, res ) {
  collection(Finish).insertOne( req.body ).then(function(r) {
    res.send( r );
  });
} );

router.post( '/count', function ( req, res ) {
  collection(Count).insertOne( req.body ).then(function(r) {
    var num = collection(Count).find();
    num.count(function(err, cnt){
        console.log("# of documents: " + cnt);
        // res.header('Content-Type', 'text/plain;charset=utf-8');
        if(cnt % 5 == 0){
            res.send("static");
        } else if(cnt % 5 == 1) {
            res.send("anchor");
        } else if(cnt % 5 == 2){
            res.send("upper");
        } else if(cnt % 5 == 3){
            res.send("scroll");
        } else {
            res.send("reverse");
        }
    });
  });
});


module.exports = router;
