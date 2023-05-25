<script>
    import Chart from "./Chart.svelte"
	import Labels from "./Labels.svelte"
	import Macros from "./Macros.svelte"

    export let result, dark, compare, isPhone, i
</script>

<div class="text-center leading-loose {compare ? '' : 'text-2xl'}">
    <b>{result.data.calories}</b> Cal - <b>{result.data.totalWeight}</b> g
</div>
<Labels {result} {isPhone} {compare} />
<div class="lg:flex flex-col lg:items-stretch">
    <div class="w-full flex items-center">
        <Chart {result} {dark} {isPhone} {compare} {i} />
    </div>
    {#if !compare}
        <div class="w-full text-xs">
            <Macros {result} />
        </div>
    {/if}
</div>
