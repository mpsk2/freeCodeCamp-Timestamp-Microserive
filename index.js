var express = require('express');
var logger = require('morgan');
var moment = require('moment');
var app = express();

app.use(logger('combined'));
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/:content', function(request, response) {
    var content = request.params.content;
    var result = {};
    if (isFinite(content)) {
        var intContent = parseInt(content)
        result['unix'] = intContent;
        var date = new Date(0);
        date.setUTCSeconds(intContent);
        result['natural'] = moment(date).format('MMMM DD, YYYY');
    } else {
        result['natural'] = content;
        result['unix'] = moment(content, 'MMMM DD, YYYY').valueOf() / 1000;
    }
    response.send(result);

});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


