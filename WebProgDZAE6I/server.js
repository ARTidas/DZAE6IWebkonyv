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
app.use('/media', express.static(
    __dirname + '/media/')
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

app.get('/drones/uavs', (req, res) => {
    page_name = 'drones-uavs';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});
app.get('/drones/ugvs', (req, res) => {
    page_name = 'drones-ugvs';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});

app.get('/drone-networks/demo', (req, res) => {
    page_name = 'drone-networks-demo';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});

app.get('/papers/exploring-drone-networks-simulation-based-insights', (req, res) => {
    res.render(
        'papers-exploring-drone-networks-simulation-based-insights'
    );
});
app.get('/papers/simple-learning-algorithms-in-limited-performance-systems-robots', (req, res) => {
    res.render(
        'papers-simple-learning-algorithms-in-limited-performance-systems-robots'
    );
});
app.get('/papers/affordable-lidar-equipped-drone-applications-expanding-accessibility-and-utility-in-monitoring', (req, res) => {
    res.render(
        'papers-affordable-lidar-equipped-drone-applications-expanding-accessibility-and-utility-in-monitoring'
    );
});

app.get('/presentations/20240418-THE-TDK', (req, res) => {
    page_name = 'presentations-20240418-THE-TDK';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});

app.get('/resources', (req, res) => {
    page_name = 'resources';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});