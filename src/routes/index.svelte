<script context="module" lang="ts">
  import { enhance } from "$lib/form";
  import type { Load } from "@sveltejs/kit";

  // see https://kit.svelte.dev/docs#loading
  export const load: Load = async ({ fetch }) => {
    const briefingsRes = await fetch(
      "https://raw.githubusercontent.com/wiki/djay/covidthailand/cases_briefings"
    );
    const reportsRes = await fetch(
      "https://raw.githubusercontent.com/wiki/djay/covidthailand/situation_reports"
    );

    if (briefingsRes.ok && reportsRes.ok) {
      const briefingsData = await briefingsRes.json();
      const reportsData = await reportsRes.json();

      return {
        props: { briefingsData, reportsData },
      };
    }

    return {
      error: new Error("Cannot fetch data"),
    };
  };
</script>

<script lang="ts">
  export let briefingsData: any[];
  export let reportsData: any[];

  const lastBriefing = briefingsData.slice(-1).pop();
  const lastReport = reportsData.slice(-1).pop();

  // Get data from the same date
  const lastBriefingDate = lastBriefing["Date"];
  const lastReportDate = lastReport["Date"];

  let latestDate = lastBriefingDate;

  if (lastBriefingDate > lastReportDate) {
    latestDate = lastReportDate;
  }

  const data = {
    briefing: briefingsData.slice(-10).find((briefing) => briefing["Date"] == latestDate),
    report: reportsData.slice(-10).find((report) => report["Date"] == latestDate),
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="flex flex-col h-screen sm:flex-row">
  <div class="w-screen h-4/9 sm:h-screen sm:w-1/2 flex justify-center items-center flex-col">
    <h1 class="text-6xl">ติด</h1>
    <div class="text-8xl">{data.briefing["Cases"]}</div>
  </div>
  <div class="w-screen h-4/9 sm:h-screen sm:w-1/2 flex justify-center items-center flex-col">
    <h1 class="text-6xl">ตรวจ</h1>
    <div class="text-8xl">
      {data.report["Tested"]
        ? data.report["Tested"]
        : (data.report["Tested PUI"] || 0) +
          (data.report["Tested Proactive"] || 0) +
          (data.report["Tested Quarantine"] || 0)}
    </div>
  </div>
  <div class="fixed text-center w-screen h-screen top-4/9 sm:top-1/2 text-2xl text-gray-600">
    vs
  </div>
</div>
<div class="fixed bottom-2 text-center w-screen z-10">
  <div>ข้อมูลวันที่ {latestDate}</div>
  <div class="text-sm">
    ข้อมูลจาก : <a href="https://djay.github.io/covidthailand" target="_blank" rel="noreferrer"
      >djay.github.io/covidthailand</a
    >
  </div>
  <div class="text-sm">
    <a href="https://github.com/narze/tid-vs-truad" target="_blank" rel="noreferrer">Github</a> |
    <a href="https://thailand-grand-opening.web.app" target="_blank" rel="noreferrer"
      >Thailand Grand Opening</a
    >
    |
    <a href="https://watasalim.vercel.app" target="_blank" rel="noreferrer">วาทะสลิ่มสุดเจ๋ง</a>
  </div>
</div>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .welcome {
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
