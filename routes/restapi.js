var express = require( 'express' );
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
// MongoDB用ファイルを指定
var collection = require( '../mongo' );
var Participants = 'participants';
var Results = 'results';
var Ad_clicked = 'ad_clicked';
var Questionnaire = 'questionnaire';
// var Finish = 'finish';
var Count = 'count';

// For Cross Origin
router.all( '/*', function ( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

// POST insert data
router.post( '/participants', function ( req, res ) {
  collection(Participants).insertOne( req.body ).then(function(r) {
    res.send( r );
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

/** router.post( '/finish', function ( req, res ) {
  collection(Finish).insertOne( req.body ).then(function(r) {
    res.send( r );
  });
} ); **/

router.post( '/count', function ( req, res ) {
  collection(Count).insertOne( req.body ).then(function(r) {
    var num = collection(Count).find();
    num.count(function(err, cnt){
    	console.log("# of documents: " + cnt);
    	// res.header('Content-Type', 'text/plain;charset=utf-8');
    	res.send(String(cnt));
    });
  });
} );

module.exports = router;
