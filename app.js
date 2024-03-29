//app.js

var express = require('express');

var app = express();
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({secret:'my super secret secretapapppxxllerjam,dfa654163210321'}));
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(express.static(__dirname));

app.use(app.router);

app.all('*', function(req, res, next){
  //console.log('Headers for', req.path, '\n', JSON.stringify(req.headers, null, 2));
  var isTrusted = 
    req.headers.eve_trusted === 'Yes' 
      ? true : false;
  if(isTrusted){
    console.log('we have trust')
  }
  req.session.isTrusted = isTrusted;
  res.locals.isTrusted = isTrusted;

  // Initialize this to false if it's undefined:
  req.session.panicReceived = 
    req.session.panicReceived === undefined
      ? false : req.session.panicReceived;
  next();
});

app.get('/', function(req, res){
  // Copy the flag that a panic was received or not into locals
  if(req.session.panicReceived){
    console.log('Panicking...')
  }
  res.locals.panicReceived = req.session.panicReceived;
  // Clear the flag
  req.session.panicReceived = false;
  res.render('index')
});

app.get('/panic', function(req, res){
  var out = 
  'PANIC!!!' + '\n'
  + 'Headers ' + JSON.stringify(req.headers, null, 2);
  console.log(out);
  req.session.panicReceived = true;
  res.redirect('/');
});

// Fire up the server:
require('http').createServer(app).listen(3000, function(err){
  console.log(err ? err : "Listening on 3000");
})