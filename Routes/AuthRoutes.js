const Joi = require("joi");
const jwt = require("jsonwebtoken");



const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

module.exports = [
  {
    method: "POST",
    path: "/auth/login",
    handler: async (request, h) => {
      if (!process.env.JWT_TOKEN) {
        return h.response({ message: "JWT_TOKEN missing" }).code(500);
      }

      const { error, value } = loginSchema.validate(request.payload);
      if (error) return h.response({ message: error.details[0].message }).code(400);

      const { email, password } = value;

      if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return h.response({ message: "Invalid credentials" }).code(401);
      }


      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_TOKEN, {
        expiresIn: "2h",
      });

      return h.response({ token }).code(200);
    },
  },
];
