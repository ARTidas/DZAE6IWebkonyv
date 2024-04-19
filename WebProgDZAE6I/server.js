const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Setup the template model
app.set('view engine', 'ejs');
app.set('views', __dirname + '/html');

// Include folders
app.use('/css', express.static(
    __dirname + '/css/')
);
app.use('/js', express.static(
    __dirname + '/js/')
);

// Include files which are not in their respective folder
app.use('/css/jquery-ui.min.css', express.static(
    __dirname + '/node_modules/jquery-ui-dist/jquery-ui.min.css'
));
app.use('/js/jquery.min.js', express.static(
    __dirname + '/node_modules/jquery/dist/jquery.min.js'
));
app.use('/js/jquery-ui.min.js', express.static(
    __dirname + '/node_modules/jquery-ui-dist/jquery-ui.min.js'
));

// Render page by request
// TODO: Make this dinamic, but prone to security vulnerabilities?
let page_name = 'index';
app.get('/', (req, res) => {
    page_name = 'index';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});

/*app.get('/', (req, res) => {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile(__dirname + '/html/index.html');
});*/


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});