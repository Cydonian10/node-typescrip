import jwt from "jsonwebtoken";

const secret = "mycat";
const token = "kasjdflkasjdf";

function verifyToken(token: any, secret: string) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
