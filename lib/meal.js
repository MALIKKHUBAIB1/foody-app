// import fs from 'node:fs';
import { S3 } from "@aws-sdk/client-s3";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  try {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    // meal.instructions = meal.instructions.replace(/\n/g, "<br>");

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferedImage = await meal.image.arrayBuffer();

    await s3.putObject({
      Bucket: "khubaib-next-js-foddy-app",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type,
    });

    meal.image = fileName;

    db.prepare(
      `
      INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `
    ).run(meal);
  } catch (error) {
    console.error("Error saving meal:", error);
    throw new Error("Saving meal failed");
  }
}
