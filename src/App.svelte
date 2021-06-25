<script>
	import Icon from "svelte-awesome";
	import { faSearch } from "@fortawesome/free-solid-svg-icons";
	import { Jumper } from "svelte-loading-spinners";
	import "./css/global.css";

	let result,
		timer = null;
	let ing = "100 g rice, 2 banana";
	let isLoading = false;
	let specs = [
		["Fat", "#d4b924"],
		["Carbs", "#81a695"],
		["Fiber", "#6dd424"],
		["Protein", "#d45924"],
	];

	const debounce = (v) => {
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

		isLoading = false;
	};
</script>

<body>
	<form class="w-full max-w-sm">
		<div class="flex items-center border-b border-teal-500 py-2">
			<textarea
				class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
				placeholder="Ingredients"
				on:keyup={debounce}
				bind:value={ing}
				id="story"
				name="story"
			/>
		</div>
	</form>
	{#if result}
		<div>
			<b>{result.calories}</b> Cal - <b>{result.totalWeight}</b> g
		</div>
		<div class="container-flex">
			{#each Object.values(result.totalNutrients) as Nutrient}
				{#each specs as spec}
					{#if spec[0] == Nutrient.label}
						<div
							class="infobulle"
							style="background-color:{spec[1]}"
						>
							<h2>
								{Nutrient.label}
							</h2>
							<p>
								{parseFloat(Nutrient.quantity).toFixed(2)}
								{Nutrient.unit}
							</p>
						</div>
					{/if}
				{/each}
			{/each}
		</div>
		<div class="scrollmenu">
			{#each result.dietLabels as dietLabel}
				<div class="labels dietLabels">
					{dietLabel}
				</div>
			{/each}
		</div>
		<div class="scrollmenu">
			{#each result.healthLabels as healthLabel}
				<div class="labels healthLabels">
					{healthLabel}
				</div>
			{/each}
		</div>
		<div class="scrollmenu">
			{#each result.cautions as caution}
				<div class="labels cautions">
					{caution}
				</div>
			{/each}
		</div>
		{#each Object.values(result.totalNutrients) as Nutrient}
			{#if Nutrient.quantity > 0}
				<div>
					<b>{Nutrient.label}</b> : {parseFloat(
						Nutrient.quantity
					).toFixed(2)}
					{Nutrient.unit}
				</div>
			{/if}
		{/each}
	{/if}
	{#if isLoading}
		<div class="spinner-item">
			<Jumper size="60" color="#FF3E00" unit="px" duration="1.5s" />
		</div>
	{/if}
</body>

<slot />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
