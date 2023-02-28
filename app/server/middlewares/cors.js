const allowedOrigins = [
    'https://planty-api.onrender.com/',
    'https://planty.onrender.com/',
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = {corsOptions}
