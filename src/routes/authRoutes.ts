import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("desde /api/auth");
});

export default router;
