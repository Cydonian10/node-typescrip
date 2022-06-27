import jwt from "jsonwebtoken";

const secret = "mycat";

const payload = {
  sub: 1,
  rol: "customer",
};

function signToken(payload: any, secret: string) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
