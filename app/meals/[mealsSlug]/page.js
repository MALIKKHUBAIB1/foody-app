function MealsDetailPage({ params }) {
  console.log(params);
  return (
    <>
      <h1>This is Meals Details Page</h1>
      <p> {params.slug}</p>
    </>
  );
}
export default MealsDetailPage;
