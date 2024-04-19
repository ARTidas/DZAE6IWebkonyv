const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use('/css', express.static(
    __dirname + '/css/')
);
app.use('/css/jquery-ui.min.css', express.static(
    __dirname + '/node_modules/jquery-ui-dist/jquery-ui.min.css'
));
app.use('/js/jquery.min.js', express.static(
    __dirname + '/node_modules/jquery/dist/jquery.min.js'
));
app.use('/js/jquery-ui.min.js', express.static(
    __dirname + '/node_modules/jquery-ui-dist/jquery-ui.min.js'
));

app.get('/', (req, res) => {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile(__dirname + '/html/index.html');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});