import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import { createHttpBodyError } from "./middleware/http-body";
import Router from "./routes";

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// cors
app.use(cors(
    {
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "x-access-token"],
        credentials: true,
    },
));

// Routes
Router(app);

/**
 * @description Forwards any requests to the favicon let ignore
 * @constructs
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes("favicon.ico")) {
        res.status(204).end();
        return;
    }
    next();
});

/**
 * @description No results returned mean the object is not found. Catch 404.
 * @constructs
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json(createHttpBodyError(err));
    if (res.statusCode === 500) {
        // 500 - Erros do servidor geralmente erros inesperados
        // eslint-disable-next-line no-console
        console.error(err.stack);
    }
    next();
});

export default app;
