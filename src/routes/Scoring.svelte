<script lang="ts">
  import { getNhl } from "../common/nhl";
  import { getLastWeekDates } from "../common/getLastWeekDates";
  import DatePicker from "../lib/DatePicker.svelte";
  import { today } from "@internationalized/date";
    import CellPulse from "../lib/CellPulse.svelte";
  // import { TopBar } from "./lib/TopBar.svelte";

  export let daily_scores;
  let goalMap = {};
  $: daily_scores, getGoalInfo();
  async function getGoalInfo() {
    if (daily_scores != undefined) {
      const promises = daily_scores.games.map(async (game) => {
        let goals = await getNhl(`wsc/game-story/${game.id}`);
        goalMap[game.id] = goals;
      });
      // Wait for all promises to resolve
      await Promise.all(promises);
      // console.log(goalMap);
    }
  }
</script>

<link href="./app.css" rel="stylesheet" />

<main class="p-5">
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> Game Number </th>
          <th scope="col" class="px-6 py-3"> Date </th>
          <th scope="col" class="px-6 py-3"> Team </th>
          <th scope="col" class="px-6 py-3"> Scoring Player </th>
          <th scope="col" class="px-6 py-3"> Assist </th>
          <th scope="col" class="px-6 py-3"> Helper </th>
          <th scope="col" class="px-6 py-3"> Period </th>
          <th scope="col" class="px-6 py-3"> Time of Goal </th>
          <th scope="col" class="px-6 py-3"> Team Against </th>
          <th scope="col" class="px-6 py-3"> Goalie </th>
          <th scope="col" class="px-6 py-3"> Shot Type </th>
          <th scope="col" class="px-6 py-3"> Team Strength </th>
          <th scope="col" class="px-6 py-3"> Type of Goal </th>
        </tr>
      </thead>
      {#if daily_scores}
        <tbody>
          {#each daily_scores.games as game}
            {#each game.goals as goal}
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex"
                >
                </th>
                <td class="px-6 py-4">
                  {game.gameDate}
                </td>
                <td class="px-6 py-4">
                  {#if goal.teamAbbrev == game.homeTeam.abbrev}
                    {game.homeTeam.name.default}
                  {:else}
                    {game.awayTeam.name.default}
                  {/if}
                </td>
                <td class="px-6 py-7 flex items-center">
                  {goal.firstName.default}
                  {goal.lastName.default}
                </td>
                <td>
                  {#if goal.assists.length == 1 || goal.assists.length == 2}
                    {goal.assists[0].name.default}
                  {/if}
                </td>
                <td>
                  {#if goal.assists.length == 2}
                    {goal.assists[1].name.default}
                  {/if}
                </td>
                <td>
                  {goal.period}
                </td>
                <td>
                  {goal.timeInPeriod}
                </td>
                <td>
                  {#if goal.teamAbbrev == game.homeTeam.abbrev}
                    {game.awayTeam.name.default}
                  {:else}
                    {game.homeTeam.name.default}
                  {/if}
                </td>
                <td>
                  <CellPulse/>
                </td>
                <td> 
                  <CellPulse/>
                </td>
              </tr>
            {/each}
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
</main>
