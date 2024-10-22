<!-- App.svelte -->
<script>
  import { Router, Link, Route } from "svelte-routing";
  import Games from "./routes/Games.svelte";
  import Scoring from "./routes/Scoring.svelte";
  import { getNhl } from "./common/nhl";
  import DatePicker from "./lib/DatePicker.svelte";
  import { today } from "@internationalized/date";

  export let url = "";
  let daily_scores;
  let date = today();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  $: (async () => {
    let scores = await getNhl(`score/${formattedDate}`);

    daily_scores = scores;
  })();

  async function handleDateChange() {
    daily_scores = undefined;
    let formatted_date = `${date.year}-${date.month}-${date.day}`;
    daily_scores = await getNhl(`score/${formatted_date}`);
    if (daily_scores.games.length == 0) {
      alert("No games to display. please choose anotha");
    }
  }
</script>

<Router {url}>
  <nav>
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-5xl font-bold mt-8 pb-0.5 border-b-4">nhlnerd.</h1>

      <!-- <TopBar/> -->
      <div class="flex-col pt-1">
        <button class="btn-lg bg-gray-200 text-gray-900 py-1 px-2 rounded-xl"
          ><Link to="/">Home</Link></button
        >
        <button class="btn-lg bg-gray-200 text-gray-900 py-1 px-2 rounded-xl"
          ><Link to="/games">Games</Link></button
        >
        <button class="btn-lg bg-gray-200 text-gray-900 py-1 px-2 rounded-xl"
          ><Link to="/scoring">Scoring</Link></button
        >
        <button class="btn-lg bg-gray-200 text-gray-900 py-1 px-2 rounded-xl"
          ><Link to="/pentalties">Pentalties</Link></button
        >
      </div>
    </div>
    <DatePicker bind:date on:update={() => console.log(date)} />
    <button
      type="button"
      on:click={handleDateChange}
      class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >Change Date</button
    >
  </nav>
  <div>
    <Route path="/">greetings, nerds
    </Route>
    <Route path="/games"><Games {daily_scores} /></Route>
    <Route path="/scoring"><Scoring {daily_scores} /></Route>
  </div>
</Router>
