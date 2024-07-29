import { getMeal } from "@/lib/meal";
import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
async function MealsDetailPage({ params }) {
  const meal = await getMeal(params.mealsSlug);

  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br>");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://khubaib-next-js-foddy-app.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal["creator-email"]}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main
        className={classes.instructions}
        dangerouslySetInnerHTML={{
          __html: meal.instructions,
        }}
      ></main>
    </>
  );
}
export default MealsDetailPage;
