import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/User";
import NodeCache from "node-cache";
import Joi from "joi";

const userInputSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const cache = new NodeCache();
const JWT_SECRET = "your_secret_key";

export const resolvers = {
  hello: () => {
    return "Hello World!";
  },

  async getUser({ id }: { id: string }) {
    const cachedUser = cache.get(id);
    if (cachedUser) return cachedUser;

    const user = await UserModel.findById(id);
    if (user) cache.set(id, user, 3600); // Cache for 1 hour
    return user;
  },

  async createUser({ input }: any) {
    const { error } = userInputSchema.validate(input);
    if (error) throw new Error(error.details[0].message);
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = new UserModel({ ...input, password: hashedPassword });
    await user.save();
    return user;
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  },
};
