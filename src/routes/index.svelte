<script context="module" lang="ts">
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
  import Kofi from "../lib/Kofi.svelte";

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
  <title>ติด vs ตรวจ</title>

  <meta name="title" content="ติด vs ตรวจ" />
  <meta name="description" content="ติด vs ตรวจ" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:url" content="https://tid-vs-truad.vercel.app" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ติด vs ตรวจ" />
  <meta property="og:description" content="ติด vs ตรวจ" />
  <meta
    property="og:image"
    content="https://raw.githubusercontent.com/narze/timelapse/master/projects/tid-vs-truad_home.png"
  />
  <meta name="twitter:title" content="ติด vs ตรวจ" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:image"
    content="https://raw.githubusercontent.com/narze/timelapse/master/projects/tid-vs-truad_home.png"
  />

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-D48ZMRTDBR"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-D48ZMRTDBR");
  </script>
</svelte:head>

<Kofi name="narze" />

<div class="flex flex-col h-screen sm:flex-row">
  <div class="w-screen h-4/9 sm:h-screen sm:w-1/2 flex justify-center items-center flex-col">
    <h1 class="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-gray-600">ติด</h1>
    <div class="text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl">
      {data.briefing["Cases"]}
    </div>
  </div>
  <div class="w-screen h-4/9 sm:h-screen sm:w-1/2 flex justify-center items-center flex-col">
    <h1 class="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-gray-600">ตรวจ</h1>
    <div class="text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl">
      {data.report["Tested"]
        ? data.report["Tested"]
        : (data.report["Tested PUI"] || 0) +
          (data.report["Tested Proactive"] || 0) +
          (data.report["Tested Quarantine"] || 0)}
    </div>
  </div>
  <div
    class="fixed text-center w-screen h-screen top-4/9 sm:top-1/2 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-gray-600"
  >
    vs
  </div>
</div>
<div class="fixed bottom-2 text-center w-screen z-10">
  <div class="text-3xl mb-4">ข้อมูลวันที่ {latestDate}</div>
  <div class="text-sm font-light text-gray-600">
    (ตัวเลขการตรวจอาจน้อยกว่าความเป็นจริง เนื่องจากข้อมูลจากทางการมาจากหลายแหล่งข้อมูล <br />
    และ/หรือ รายงานผลช้ากว่าจำนวนผู้ติดเชื้อโควิด
    <a href="https://github.com/djay/covidthailand#positive-rate">อ่านเพิ่มเติม</a>)
  </div>
  <div>
    ขอบคุณข้อมูลจาก : <a
      href="https://djay.github.io/covidthailand"
      target="_blank"
      rel="noreferrer">djay.github.io/covidthailand</a
    >
  </div>
  <div>
    <a href="https://github.com/narze/tid-vs-truad" target="_blank" rel="noreferrer">Github</a> |
    <a href="https://thailand-grand-opening.web.app" target="_blank" rel="noreferrer"
      >120วันเปิดประเทศ?</a
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
