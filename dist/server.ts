import express from "express";
import { db } from "./db";
import { users } from "./db/schema";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  // Проверяем, что email свободен
  const existing = await db.select().from(users).where(users.email.eq(email));
  if (existing.length > 0)
    return res.status(409).json({ error: "Email already registered" });

  // Хэшируем пароль
  const hash = await bcrypt.hash(password, 10);

  // Создаём пользователя
  const [user] = await db
    .insert(users)
    .values({ email, passwordHash: hash })
    .returning();

  res.json({ id: user.id, email: user.email });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
