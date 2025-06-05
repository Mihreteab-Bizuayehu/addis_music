import {  ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message:`Error: ${err.message}` }
    );};