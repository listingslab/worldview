var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/worldview';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

//load the Client interface
var MongoClient = require('mongodb').MongoClient;
// the client db connection scope is wrapped in a callback:
MongoClient.connect('mongodb://'+connection_string, function(err, db) {
  if(err) throw err;
  var collection = db.collection('countries').find().limit(10).toArray(function(err, docs) {
    console.dir(docs);
    db.close();
  })
})