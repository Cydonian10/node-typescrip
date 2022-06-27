import { unauthorized } from "@hapi/boom";
import { Strategy } from "passport-local";
import { UserService } from "../../services/user.service";
import bcrypt from "bcrypt";

const service = new UserService();

export const LocalStrategy = new Strategy(
  { passwordField: "password", usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await service.findEmail(email);
      if (!user) {
        done(unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(unauthorized(), false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
