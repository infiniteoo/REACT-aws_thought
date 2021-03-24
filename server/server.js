const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/user-routes_ref');

// express middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
} 

app.use('/api/', userRoutes);

// start the API server
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
})
