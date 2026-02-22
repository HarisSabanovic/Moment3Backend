const Joi = require("joi");
const BlogPost = require("../Models/BlogPost");
const { requireAuth } = require("../Middleware/Auth");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(120).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().min(2).max(60).required(),
});

module.exports = [
  // Publik: hämta alla
  {
    method: "GET",
    path: "/posts",
    handler: async (_request, h) => {
      const posts = await BlogPost.find().sort({ createdAt: -1 });
      return h.response(posts).code(200);
    },
  },

  // Publik: hämta en
  {
    method: "GET",
    path: "/posts/{id}",
    handler: async (request, h) => {
      const post = await BlogPost.findById(request.params.id);
      if (!post) return h.response({ message: "Not found" }).code(404);
      return h.response(post).code(200);
    },
  },

  // Skyddad: skapa
  {
    method: "POST",
    path: "/posts",
    options: {
      pre: [{ method: requireAuth }],
    },
    handler: async (request, h) => {
      const { error, value } = postSchema.validate(request.payload);
      if (error) return h.response({ message: error.details[0].message }).code(400);

      const created = await BlogPost.create(value);
      return h.response(created).code(201);
    },
  },

  // Skyddad: uppdatera
  {
    method: "PUT",
    path: "/posts/{id}",
    options: {
      pre: [{ method: requireAuth }],
    },
    handler: async (request, h) => {
      const { error, value } = postSchema.validate(request.payload);
      if (error) return h.response({ message: error.details[0].message }).code(400);

      const updated = await BlogPost.findByIdAndUpdate(request.params.id, value, { new: true });
      if (!updated) return h.response({ message: "Not found" }).code(404);

      return h.response(updated).code(200);
    },
  },

  // Skyddad: ta bort
  {
    method: "DELETE",
    path: "/posts/{id}",
    options: {
      pre: [{ method: requireAuth }],
    },
    handler: async (request, h) => {
      const deleted = await BlogPost.findByIdAndDelete(request.params.id);
      if (!deleted) return h.response({ message: "Not found" }).code(404);
      return h.response().code(204);
    },
  },
];
