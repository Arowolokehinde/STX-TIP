import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import globalErrorHandler from "./errorHandlers/errorHandler.js";
import { mountedRoutes } from "./routes.js";


const app = express();


// SET Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development')
{
    app.use(morgan("dev"));
}

// The body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));


// The cross origin resource sharing
const corOptions = cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
});
app.use(corOptions);

mountedRoutes(app);

app.all("*", (req, res, next) =>
{
    const err = new Error(`Can't find ${req.originalUrl} in this server!`);
    err.statusCode = 404;
    next(err);
});

app.use(globalErrorHandler);

export default app;
