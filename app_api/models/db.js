const mongoose = require('mongoose');

let dbURI = 'mongodb://localhost/Loc8r';
let dbAPP = 'mongodb://localhost/api1';

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}
//mongoose.connect(dbURI);
var conn1 = mongoose.createConnection(dbURI);
var conn2 = mongoose.createConnection(dbAPP);

exports.conn1 = conn1;
exports.conn2 = conn2;

conn1.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
conn1.on('error', err => {
  console.log('Mongoose connection error:', err);
});
conn1.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  conn1.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};


conn2.on('connected', () => {
  console.log(`Mongoose connected to ${dbAPP}`);
});
conn2.on('error', err => {
  console.log('Mongoose connection error:', err);
});
conn2.on('disconnected', () => {
  console.log('Mongoose disconnected');
});  

const gracefulShutdown2 = (msg, callback) => {
  conn2.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};   

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

require('./locations');
