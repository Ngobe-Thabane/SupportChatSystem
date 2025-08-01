import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config({path:'../configs/.env'});

interface DecodedUser {
  id: string;
  username: string;
  role: 'user' | 'admin';
  iat: number,
  exp: number,
}

declare module 'express' {
  interface Request {
    user?: DecodedUser;
  }
}

export function verifyToken(req:Request, res:Response, next:NextFunction) {

  const SECRET_KEY = process.env.JWT_SECRET as string;
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).send({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded as DecodedUser;
    next();
  } catch (err:unknown) {
    return res.status(403).send({ error:err.message });
  }
}


export function requireAdmin(req:Request, res:Response, next:NextFunction) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).send({ error: 'Admin access only' });
}
