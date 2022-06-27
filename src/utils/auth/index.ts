import passport from "passport";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

passport.use(LocalStrategy);
passport.use(JwtStrategy);
