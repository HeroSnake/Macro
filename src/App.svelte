<script>
	import Icon from "svelte-awesome";
	import { faSearch } from "@fortawesome/free-solid-svg-icons";
	import { Jumper } from "svelte-loading-spinners";
	import Chart from "./Chart.svelte";
	import Labels from "./Labels.svelte";
	import Macros from "./Macros.svelte";
	import Infos from "./Infos.svelte";
	import "./css/global.css";

	let result,
		timer = null;
	let ing = "100 g rice, 2 banana";
	let isLoading = false;
	let specs = [];
	let dark = false;

	const mapNutriments = () => {
		let forbidden_elements = ["Saturated", "Monounsaturated", "Polyunsaturated", "Sugars", "Water"];

		specs = [
			["Fat", "#d4b924", 0],
			["Carbs", "#81a695", 0],
			["Fiber", "#6dd424", 0],
			["Protein", "#d45924", 0],
			["Others", "#e7d3fe", 0],
		];
		for (const nutrient of Object.values(result.totalNutrients)) {
			if (nutrient.unit != "kcal") {
				let other = true;
				let quantity = parseFloat(nutrient.quantity);
				switch (nutrient.unit) {
					case "mg":
						quantity = quantity / 1000;
						break;
					case "µg":
						quantity = quantity / 1000000;
						break;
				}
				specs.forEach((spec) => {
					if (spec[0].includes(nutrient.label)) {
						other = false;
						spec[2] += quantity;
					}
				});
				if (other && !forbidden_elements.includes(nutrient.label)) {
					specs[4][2] += quantity;
				}
			}
		}
	};
	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(getData, 750);
	};
	const getData = async () => {
		result = null;
		if (!ing) {
			return;
		}
		isLoading = true;
		ing = ing.split(",");
		let json = { ingr: ing };
		result = await fetch(
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
					return null;
				}
				return e.json();
			})
			.catch(() => null);
		mapNutriments();
		isLoading = false;
	};
	const toggleDarkMode = () => {
		if (!dark) {
			document.documentElement.classList.add("mode-dark");
			localStorage.setItem("dark", true);
		} else {
			document.documentElement.classList.remove("mode-dark");
			localStorage.removeItem("dark");
		}
		dark = !dark;
	};
	getData();
</script>

<form class="w-full">
	<!-- Toggle B -->
	<div class="flex items-center justify-center w-full mb-4">
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
	</div>
	<div class="flex items-center border-b border-teal-500 py-2">
		<textarea
			class="appearance-none bg-transparent border-none w-full dark:text-white text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center focus:underline text-xl"
			placeholder="Ingredients"
			on:keyup={debounce}
			bind:value={ing}
			id="ingredients"
			name="ingredients"
		/>
	</div>
</form>

{#if result}
	<div class="text-center text-3xl leading-loose">
		<Infos {result} />
	</div>
	<Labels {result} />
	<div class="lg:flex lg:items-stretch">
		<div class="w-full flex items-center">
			<Chart {specs} {dark} />
		</div>
		<div class="w-full text-center"><Macros {result} /></div>
	</div>
{/if}
{#if isLoading}
	<div class="spinner-item">
		<Jumper size="60" color="#FF3E00" unit="px" duration="1.5s" />
	</div>
{/if}

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
