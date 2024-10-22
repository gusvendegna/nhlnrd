<script lang="ts">
  import { getNhl } from "../common/nhl";
  import { getLastWeekDates } from "../common/getLastWeekDates";
  import DatePicker from "../lib/DatePicker.svelte";
  import { today } from "@internationalized/date";
  // import { TopBar } from "./lib/TopBar.svelte";

  export let daily_scores;
  let player;

  
  // console.log(formattedDate)
  
  let last_week_dates = getLastWeekDates();

  // Reactive blocks to fetch data


  $: (async () => {
    player = await getNhl("player/8478402/game-log/20232024/2");
  })();
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
          <th scope="col" class="px-6 py-3"> Date </th>
          <th scope="col" class="px-6 py-3"> Home Team </th>
          <th scope="col" class="px-6 py-3"> Away Team </th>
          <th scope="col" class="px-6 py-3"> Home Goals </th>
          <th scope="col" class="px-6 py-3"> Away Goals </th>
          <th scope="col" class="px-6 py-3"> Home Shots </th>
          <th scope="col" class="px-6 py-3"> Away Shots </th>
          <th scope="col" class="px-6 py-3"> OT </th>
          <th scope="col" class="px-6 py-3"> Home Win/Loss </th>
        </tr>
      </thead>
      {#if daily_scores}
        <tbody>
          {#each daily_scores.games as game}
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex"
              >
                {game.gameDate}
                {#if game.gameState == "LIVE" || game.gameState == "CRIT"}
                  <span class="relative flex h-2 w-2 m-1.5">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                    ></span>
                    <span
                      class="relative inline-flex rounded-full h-2 w-2 bg-red-500"
                    ></span>
                  </span>
                {/if}
              </th>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  {game.homeTeam.name.default}
                  <img
                    src={game.homeTeam.logo}
                    alt="home team logo"
                    class="w-10 h-10"
                  />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  {game.awayTeam.name.default}
                  <img
                    src={game.awayTeam.logo}
                    alt="away team logo"
                    class="w-10 h-10"
                  />
                </div>
              </td>
              <td class="px-6 py-7 flex items-center">
                {#if game.gameState != "PRE" && game.gameState != "FUT"}
                  <p class="text-md">{game.homeTeam.score}</p>
                {/if}
              </td>
              <td>
                {#if game.gameState != "PRE" && game.gameState != "FUT"}
                  <p class="text-md">{game.awayTeam.score}</p>
                {/if}
              </td>
              <td>
                {#if game.gameState != "PRE" && game.gameState != "FUT"}
                  <p class="text-md">{game.homeTeam.sog}</p>
                {/if}
              </td>
              <td>
                {#if game.gameState != "PRE" && game.gameState != "FUT"}
                  <p class="text-md">{game.awayTeam.sog}</p>
                {/if}
              </td>
              <td>
                {#if game.gameState != "PRE" && game.gameState != "FUT"}
                  <div class="flex">
                    <p class="text-md">{game.period}</p>
                    <!-- {#if game.periodDescriptor.periodType == "REG"}
                  <p class="text-md ml-1">Regulation</p>
                {:else}
                  <p class="text-md">Overtime</p>
                {/if} -->
                  </div>
                {/if}
              </td>
              <td>
                {#if game.gameState != "PRE" || game.gameState != "FUT"}
                  <!-- <p class="text-md pl-10">n/a</p> -->
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
</main>
