<script>
    import Chart from "./Chart.svelte"
	import Labels from "./Labels.svelte"
	import Macros from "./Macros.svelte"
	import Infos from "./Infos.svelte"

    export let result, dark, compare, isPhone, i
    console.log(isPhone)
</script>

<div class="text-center leading-loose {compare ? '' : 'text-2xl'}">
    <Infos {result} {isPhone}/>
</div>
<Labels {result} {isPhone} {compare} />
<div class="lg:flex flex-col lg:items-stretch">
    <div class="w-full flex items-center">
        <Chart {result} {dark} {isPhone} {compare} {i} />
    </div>
    <div class="w-full text-center {isPhone ? 'text-xs' : ''}">
            <Macros {result} />
    </div>
</div>
