<script>
    import Chart from "./Chart.svelte"
	import Labels from "./Labels.svelte"
	import Macros from "./Macros.svelte"
	import Infos from "./Infos.svelte"

    export let result, dark, compare, i
</script>

<div class="text-center leading-loose {compare ? '' : 'text-2xl'}">
    <Infos {result}/>
</div>
<Labels {result} />
<div class="lg:flex lg:items-stretch">
    <div class="w-full flex items-center">
        <Chart {result} {dark} {i} />
    </div>
    <div class="w-full text-center {compare ? 'text-xs' : ''}">
            <Macros {result} />
    </div>
</div>
