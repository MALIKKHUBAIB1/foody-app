import { getMeal } from "@/lib/meal";
import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
function MealsDetailPage({ params }) {
  // console.log(params);
  const meal = getMeal(params.mealsSlug);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br >");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
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
