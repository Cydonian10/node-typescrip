import { unauthorized } from "@hapi/boom";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "../../config/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtsecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  if (!payload) {
    done(unauthorized(), false);
  }
  return done(null, payload);
});
