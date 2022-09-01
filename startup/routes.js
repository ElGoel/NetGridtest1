import express from 'express';
import boards from '../routes/boards.js';

const setRoutes = (app) => {
    app.use(express.json());
    app.use("/api/boards", boards);
}

export default setRoutes;