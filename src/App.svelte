<script>
	import Icon from "svelte-awesome"
	import { faCompressAlt } from "@fortawesome/free-solid-svg-icons"
	import { Jumper } from "svelte-loading-spinners"
	import ChartCompare from "./ChartCompare.svelte"
	import Result from "./Result.svelte"
	import "./css/global.css"
	import './lib/TailwindCSS.svelte'

	let timer = null
	let ingredients = [
		localStorage.getItem("ingredients0") ? localStorage.getItem("ingredients0") : "100 g rice, 2 banana",
		localStorage.getItem("ingredients1") ? localStorage.getItem("ingredients1") : "100 g pasta, 100 g courgette",
	]
	let isLoading, dark, compare = false
	let results = [ {data: {}, specs: []}, {data: {}, specs: []}];
	let lastIndex = 0

	const mapNutriments = (index) => {
		let forbidden_elements = ["Saturated", "Monounsaturated", "Polyunsaturated", "Sugars", "Water"]
		results[index].specs = [
			["Fat", "#d4b924", 0],
			["Carbs", "#81a695", 0],
			["Fiber", "#6dd424", 0],
			["Protein", "#d45924", 0],
			["Others", "#e7d3fe", 0]
		]
		for (const nutrient of Object.values(results[index].data.totalNutrients)) {
			if (nutrient.unit != "kcal") {
				let other = true
				let quantity = parseFloat(nutrient.quantity)
				switch (nutrient.unit) {
					case "mg":
						quantity = quantity / 1000
						break
					case "µg":
						quantity = quantity / 1000000
						break
				}
				results[index].specs.forEach((spec) => {
					if (spec[0].includes(nutrient.label)) {
						other = false
						spec[2] += quantity
					}
				})
				if (other && !forbidden_elements.includes(nutrient.label)) {
					results[index].specs[4][2] += quantity
				}
			}
		}
	}
	const toggleDarkMode = () => {
		if (!dark) {
			document.documentElement.classList.add("mode-dark")
			localStorage.setItem("dark", true)
		} else {
			document.documentElement.classList.remove("mode-dark")
			localStorage.removeItem("dark")
		}
		dark = !dark
	}
	function handleClick(index){
		if(ingredients[index] != ''){
			toggleIndex(index)
			debounce()
		}
	}
	const toggleCompare = () => {
		compare = !compare
		if(compare && ingredients[1] != '' && isEmptyObject(results[1].data)) {
			handleClick(1)
		}
	}
	const toggleIndex = (index) => {
		lastIndex = index
	}
	const debounce = () => {
		clearTimeout(timer)
		timer = setTimeout(getData(lastIndex), 750)
	}
    const getData = async (index) => {
		results[index].data = {}
		if (!ingredients[index]) {
			return
		}
		isLoading = true
		let ing = ingredients[index].split(",")
		let json = { ingr: ing }
		results[index].data = await fetch(
			"https://api.edamam.com/api/nutrition-details?app_id=690348ca&app_key=bedbeeb0e08003fce6d13408ccaf231d",
			{
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json",
				}),
				body: JSON.stringify(json),
			}
		)
			.then((e) => {
				if (e.status !== 200) {
					return {}
				}
				return e.json()
			})
			.catch(() => {})
		if(!isEmptyObject(results[index].data)){
			mapNutriments(index)
		}
		isLoading = false
		localStorage.setItem("ingredients"+index, ingredients[index])
	}
	const isEmptyObject = (obj) => {
		return Object.keys(obj).length === 0 && obj.constructor === Object
	}
	getData(lastIndex)
</script>

<form class="w-full">
	<!-- Toggle B -->
	<div class="flex items-center justify-center flex-col w-full mb-4">
		<label for="toggleB" class="flex items-center cursor-pointer">
			<!-- toggle -->
			<div class="relative">
				<!-- input -->
				<input
					type="checkbox"
					on:click={toggleDarkMode}
					id="toggleB"
					class="sr-only"
				/>
				<!-- line -->
				<div class="block bg-gray-600 w-14 h-8 rounded-full" />
				<!-- dot -->
				<div
					class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
				/>
			</div>
		</label>
		<button type="button" class="flex items-center font-bold py-1 px-2 mt-2 rounded" on:click={toggleCompare}>
			<Icon data={faCompressAlt} scale={2}/>
		</button>
	</div>
	<div class="flex items-center border-b border-teal-500 py-2">
		<textarea
			class="appearance-none bg-transparent border-none w-full dark:text-white text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center focus:underline {compare ? 'text-base' : 'text-xl'}"
			placeholder="Ingredients #1"
			on:change={() => handleClick(0)}
			bind:value={ingredients[0]}
		/>
		{#if compare}
			<textarea
				class="appearance-none bg-transparent border-none w-full dark:text-white text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center focus:underline {compare ? 'text-base' : 'text-xl'}"
				placeholder="Ingredients #2"
				on:change={() => handleClick(1)}
				bind:value={ingredients[1]}
			/>
		{/if}
	</div>
</form>

{#if isLoading}
	<div class="spinner-item">
		<Jumper size="60" color="#FF3E00" unit="px" duration="1.5s" />
	</div>
{:else}
	{#if !isEmptyObject(results[0].data)}
		{#if compare && !isEmptyObject(results[1].data)}
			<ChartCompare {results} {ingredients} {dark}/>
		{/if}
		<div class="flex">
			{#each results as result, i}
				<div class="flex flex-col {compare ? 'w-1/2 px-2' : 'w-full'}">
					{#if !isEmptyObject(result.data) && (i == 0 || compare)}
						<Result {result} {dark} {compare} {i}/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
{/if}