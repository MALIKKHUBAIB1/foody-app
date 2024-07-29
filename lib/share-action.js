"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meal";
import { revalidatePath } from "next/cache";
export async function shareMeals(prevState, formData) {
  function isInvalid(text) {
    return text.trim() === "" || !text;
  }
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    creator: formData.get("name"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator_email: formData.get("email"),
  };
  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Inavid input Please enter a valid Input",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}

// export async function shareMeals(prevState, formData) {
//   function isInvalid(text) {
//     return !text || text.trim() === "";
//   }

//   const meal = {
//     title: formData.get("title"),
//     summary: formData.get("summary"),
//     instructions: formData.get("instructions"),
//     creator: formData.get("creator"),
//     creator_email: formData.get("creator_email"),
//     image: formData.get("image"),
//   };

//   if (
//     isInvalid(meal.title) ||
//     isInvalid(meal.summary) ||
//     isInvalid(meal.instructions) ||
//     isInvalid(meal.creator) ||
//     isInvalid(meal.creator_email)
//   ) {
//     throw new Error("All fields except image are required");
//   }

//   return meal;
// }
