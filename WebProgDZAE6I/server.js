const express = require('express');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongodb_url = 'mongodb://localhost:27017';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for session management
app.use(session({
    secret: generateSessionSecret(),
    resave: false,
    saveUninitialized: false
}));

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Backend API urls
app.get('/api/get-drones', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('drones_database');
        const collection = db.collection('drones_collection');

        const drones = await collection.find({}).toArray();
        res.json(drones);

        client.close();
    } catch (error) {
        console.error('ERROR: Error retrieving drones data:', error);
        res.status(500).json({ error: 'ERROR: Internal Server Error' });
    }
});
app.post('/api/register-user', async (req, res) => {
    try {
        //console.log(req.body);
        const { username, email, password } = req.body;

        // TODO: Do backend data validation here.

        const client = await MongoClient.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('drones_database');
        const collection = db.collection('users_collection');

        const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'ERROR: Username and/or email is already registered' });
        }

        await collection.insertOne(
            {
                username,
                email,
                password // TODO: We need to use password encription!!!
            }
        );

        res.json({ message: 'OK: Registration successful' });

        client.close();
    }
    catch (error) {
        console.error('ERROR: Error registering user:', error);
        res.status(500).json({ error: 'ERROR: Internal Server Error' });
    }
});
app.post('/api/login-user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await MongoClient.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('drones_database');
        const collection = db.collection('users_collection');
        
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found by email!' });
        }
        // TODO: We need to use password encription!!!
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        //return res.status(200).json({ message: 'Login successful' });
        req.session.user = {
            _id         : user._id,
            email       : user.email,
            username    : user.username
        };
        res.writeHead(
            301,
            {
                Location: `http://localhost:3000` // TODO: Somewhy this does not redirect!
            }
        ).end();
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/api/count-drones', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('drones_database');
        const collection = db.collection('drones_collection');

        const response = await collection.countDocuments();
        res.json(response);

        client.close();
    } catch (error) {
        console.error('ERROR: Error retrieving data:', error);
        res.status(500).json({ error: 'ERROR: Internal Server Error' });
    }
});
app.get('/api/count-users', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('drones_database');
        const collection = db.collection('users_collection');

        const response = await collection.countDocuments();
        res.json(response);

        client.close();
    } catch (error) {
        console.error('ERROR: Error retrieving data:', error);
        res.status(500).json({ error: 'ERROR: Internal Server Error' });
    }
});
app.get('/api/search-drones', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('drones_database');
        const collection = db.collection('drones_collection');

        const { keyword } = req.query;
        const regex = new RegExp(keyword, 'i');
        console.log(`---Searching for keyword: ${keyword}`);

        const response = await collection.find(
            {
                $or: [
                    { platform: regex },
                    { company: regex },
                    { drone_id: regex },
                    { country: regex },
                ]
            }
        ).toArray();
        res.json({response});

        client.close();
    } catch (error) {
        console.error('Error searching drones:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Setup the template model
app.set('view engine', 'ejs');
app.set('views', __dirname + '/html');

// Include folders
app.use('/css', express.static(
    __dirname + '/css/'
));
app.use('/js', express.static(
    __dirname + '/js/'
));
app.use('/media', express.static(
    __dirname + '/media/'
));
app.use('/data_scraper', express.static(
    __dirname + '/data_scraper/'
));

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
// TODO: Make this dinamic, but would that make the website prone to security vulnerabilities?
let page_name = 'index';
app.get('/', (req, res) => {
    page_name = 'index';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});

app.get('/user/register', (req, res) => {
    page_name = 'user-register';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});
app.get('/user/login', (req, res) => {
    page_name = 'user-login';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});
app.get('/user/profile', (req, res) => {
    let user_data;
    if (req.session && req.session.user) {
        user_data = req.session.user;
        //res.status(200).json(user_data);
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }

    page_name = 'user-profile';
    res.render(
        'partials/frame', {
            page_name: page_name,
            user: user_data
        }
    );
});

app.get('/drones/search', (req, res) => {
    page_name = 'drones-search';
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
app.get('/drones/uavs-mongodb', (req, res) => {
    page_name = 'drones-uavs-mongodb';
    res.render(
        'partials/frame', {
            page_name: page_name
        }
    );
});
app.get('/drones/uavs-json', (req, res) => {
    page_name = 'drones-uavs-json';
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

function generateSessionSecret() {
    return (
        crypto
            .randomBytes(32)
            .toString('hex')
    );
};