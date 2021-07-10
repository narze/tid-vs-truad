<script context="module" lang="ts">
	import { enhance } from '$lib/form';
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const briefingsRes = await fetch('https://raw.githubusercontent.com/wiki/djay/covidthailand/cases_briefings');
		const reportsRes = await fetch('https://raw.githubusercontent.com/wiki/djay/covidthailand/situation_reports');

		if (briefingsRes.ok && reportsRes.ok) {
			const briefingsData = await briefingsRes.json();
			const reportsData = await reportsRes.json();

      console.log({briefingsData, reportsData});

			return {
				props: { briefingsData,reportsData }
			};
		}

		return {
			error: new Error("Cannot fetch data")
		};
	};
</script>

<script lang="ts">
  export let briefingsData: any[];
  export let reportsData: any[];

  export let lastBriefing = briefingsData.slice(-1).pop()
  export let lastReport = reportsData.slice(-1).pop()
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>ติด : {lastBriefing["Cases"]} (ข้อมูลวันที่ {lastBriefing["Date"]})</h1>
  <h1>ตรวจ : {lastReport["Tested"] ? lastReport["Tested"] : (lastReport["Tested PUI"] || 0) + (lastReport["Tested Proactive"] || 0) + (lastReport["Tested Quarantine"] || 0) } (ข้อมูลวันที่ {lastReport["Date"]})</h1>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
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
