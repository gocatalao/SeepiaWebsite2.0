import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const result = SubmitContactBody.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  const { name, email, company, message } = result.data;

  await db.insert(contactsTable).values({ name, email, company: company ?? null, message });

  res.status(201).json({ success: true, message: "Thank you! We'll be in touch shortly." });
});

export default router;
