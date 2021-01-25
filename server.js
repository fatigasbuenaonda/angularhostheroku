const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/finsa'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/finsa/index.html'));
});
app.listen(process.env.PORT || 1111);