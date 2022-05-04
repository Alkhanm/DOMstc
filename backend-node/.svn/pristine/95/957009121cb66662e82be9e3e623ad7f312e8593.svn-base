#!/usr/bin/env node

/**
 * Module dependencies.
 */

import deb from "debug";
import http from "http";
import { Sequelize } from "sequelize/types";
import app from "../src/app";
import db, { initDbModules } from "../src/models";

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val: number | string | boolean) {
    const port = parseInt(String(val), 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error: NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string"
        ? `Pipe ${port}`
        : `Port ${String(port)}`;

    // handle specific listen errors with friendly messages
    if (error.code === "EACCES") {
        // eslint-disable-next-line no-console
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
    } else if (error.code === "EADDRINUSE") {
        // eslint-disable-next-line no-console
        console.error(`${bind} is already in use`);
        process.exit(1);
    } else {
        throw error;
    }
}

/**
 * debug in Express.
 */

const debug = deb("exp-cli:server");

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr!.port}`;

    /* Sequelize - DB Connection */
    initDbModules().finally(() => {
        (db.sequelize as Sequelize).authenticate().then(() => {
            // eslint-disable-next-line no-console
            console.log("BD Connection has been established successfully.");
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.error("BD Unable to connect to the database:\n", error);
        }).finally(() => {
            debug(`Listening on ${bind}`);
            // eslint-disable-next-line no-console
            console.log(`Listening on ${bind}`);
        });
    });
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
