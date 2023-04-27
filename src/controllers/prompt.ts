import { Controller } from "../types.js";

const prompt: Controller = async (req, res) => {
  const { userId, taskId } = req.params;
  res.render("prompt", { userId, taskId });
};

export default prompt;
