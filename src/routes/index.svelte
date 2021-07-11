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
  import { Facebook, Twitter } from "svelte-share-buttons-component";

  const url = "https://tid-vs-truad.vercel.app";
  const title = "ติด vs ตรวจ";

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
  <meta name="description" content="ยอดผู้ติดโควิดน้อย เพราะตรวจน้อยจริงหรือไม่? มาดูกัน" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:url" content="https://tid-vs-truad.vercel.app" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ติด vs ตรวจ" />
  <meta property="og:description" content="ยอดผู้ติดโควิดน้อย เพราะตรวจน้อยจริงหรือไม่? มาดูกัน" />
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

<div class="flex flex-col h-screen sm:flex-row fixed w-screen">
  <div
    class="w-screen h-2/5 landscape-h-sm:h-4/5 sm:h-full sm:w-1/2 flex justify-center items-center flex-col"
  >
    <h1
      class="text-3xl xs:text-5xl landscape-h-sm:text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl 2k:text-11xl 4k:text-12xl md:leading-normal text-gray-600"
    >
      ติด
    </h1>
    <div
      class="text-4xl xs:text-6xl landscape-h-sm:text-7xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl 2k:text-12xl 4k:text-13xl sm:leading-normal"
    >
      {data.briefing["Cases"]}
    </div>
  </div>
  <div
    class="w-screen h-2/5 landscape-h-sm:h-4/5 sm:h-full sm:w-1/2 flex justify-center items-center flex-col"
  >
    <h1
      class="text-3xl xs:text-5xl landscape-h-sm:text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl 2k:text-11xl 4k:text-12xl md:leading-normal text-gray-600"
    >
      {" "}ตรวจ<span
        class="text-gray-400 text-3xl landscape-h-sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 2k:text-9xl 4k:text-10xl"
        >*</span
      >
    </h1>
    <div
      class="text-4xl xs:text-6xl landscape-h-sm:text-7xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl 2k:text-12xl 4k:text-13xl sm:leading-normal"
    >
      {data.report["Tested"]
        ? data.report["Tested"]
        : (data.report["Tested PUI"] || 0) +
          (data.report["Tested Proactive"] || 0) +
          (data.report["Tested Quarantine"] || 0)}
    </div>
  </div>
  <div
    class="fixed text-center w-screen h-full top-1/3 pt-10 sm:pt-0 sm:top-1/2 text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 2k:text-7xl 4k:text-8xl text-gray-600"
  >
    vs
  </div>
</div>
<div class="text-xs sm:text-base fixed top-2 p-2 text-center w-screen z-10">
  เชิญชวนร่วมลงชื่อในแคมเปญ Change.org <a
    href="http://chng.it/xLMgByz6RF"
    target="_blank"
    rel="noreferrer">"กรมวิทยาศาสตร์การแพทย์ เปิดเผยจำนวนการตรวจโควิด-19 ต่อวัน ทุกวัน"</a
  >
</div>
<div class="text-xs sm:text-base fixed bottom-16 sm:bottom-2 text-center w-screen z-10">
  <div class="mb-4 hidden sm:block">
    <Facebook class="h-10 w-10" {url} />
    <Twitter class="h-10 w-10" text={title} {url} />
  </div>
  <div class="text-3xl mb-4">ข้อมูลวันที่ {latestDate}</div>
  <div class="text-sm font-light text-gray-600">
    (* ตัวเลขการตรวจอาจน้อยกว่าความเป็นจริง เนื่องจากข้อมูลจากทางการมาจากหลายแหล่งข้อมูล <br />
    และ/หรือ รายงานผลช้ากว่าจำนวนผู้ติดเชื้อโควิด-19 และ/หรือ ไม่มีการรายงานข้อมูล
    <a href="https://github.com/djay/covidthailand#positive-rate">อ่านเพิ่มเติม</a>)
  </div>
  <div class="font-light">
    ขอบคุณข้อมูลจาก <a href="https://djay.github.io/covidthailand" target="_blank" rel="noreferrer"
      >djay.github.io/covidthailand</a
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
<div class="fixed bottom-4 right-4 z-20 sm:hidden">
  <Facebook class="h-10 w-10" {url} />
  <Twitter class="h-10 w-10" text={title} {url} />
</div>

<style>
  @font-face {
    font-family: "Anakotmai";
    font-style: normal;
    font-weight: normal;
    src: url("../../static/fonts/anakotmai-medium.eot"); /* IE9 Compat Modes */
    src: url("../../static/fonts/anakotmai-medium.eot#iefix") format("embedded-opentype"),
      url("../../static/fonts/anakotmai-medium.woff2") format("woff2"),
      url("../../static/fonts/anakotmai-medium.woff") format("woff");
  }

  @font-face {
    font-family: "Anakotmai";
    font-style: normal;
    font-weight: bold;
    src: url("../../static/fonts/anakotmai-bold.eot"); /* IE9 Compat Modes */
    src: url("../../static/fonts/anakotmai-bold.eot#iefix") format("embedded-opentype"),
      url("../../static/fonts/anakotmai-bold.woff2") format("woff2"),
      url("../../static/fonts/anakotmai-bold.woff") format("woff");
  }

  @font-face {
    font-family: "Anakotmai";
    font-style: normal;
    font-weight: 300;
    src: url("../../static/fonts/anakotmai-light.eot"); /* IE9 Compat Modes */
    src: url("../../static/fonts/anakotmai-light.eot#iefix") format("embedded-opentype"),
      url("../../static/fonts/anakotmai-light.woff2") format("woff2"),
      url("../../static/fonts/anakotmai-light.woff") format("woff");
  }

  * {
    font-family: "Anakotmai";
  }
</style>
