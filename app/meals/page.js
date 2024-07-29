import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/component/Meals/meals-grid";
import { getMeals } from "@/lib/meal";
import { Suspense } from "react";
import MealLoading from "./loading-out";
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delecious Meals, created
          <span className={classes.highlight}>by You</span>
        </h1>
        <p>Chose Your Favroute and cook it yourself it is easy and fun</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favroute Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealLoading />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
