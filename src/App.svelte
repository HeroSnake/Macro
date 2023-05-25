<script>
	import Icon from "svelte-awesome"
	import { faCompressAlt } from "@fortawesome/free-solid-svg-icons"
	import { Jumper } from "svelte-loading-spinners"
	import ChartCompare from "./ChartComparison.svelte"
	import Result from "./Result.svelte"
	import "./css/global.css"
	import './lib/TailwindCSS.svelte'

	let timer = null
	let ingredients = [
		localStorage.getItem("ingredients0") ? localStorage.getItem("ingredients0") : "100 g rice, 2 banana",
		localStorage.getItem("ingredients1") ? localStorage.getItem("ingredients1") : "100 g pasta, 100 g courgette",
	]
	let isLoading, dark, compare = false
	let results = [ {data: {}, specs: {}}, {data: {}, specs: {}}];
	let lastIndex = 0
	let isPhone = false

	const detectMobile = () => {
		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		isPhone = check
	}

	const mapNutriments = (index) => {
		results[index].specs = {
			Fat: { color: "#d4b924", quantity: 0, nutrients: ["Total lipid (fat)","Fatty acids, total saturated","Fatty acids, total monounsaturated", "Fatty acids, total polyunsaturated"] },
			Carbs: { color: "#81a695", quantity: 0, nutrients: ["Carbohydrate, by difference"] },
			Fiber: { color: "#6dd424", quantity: 0, nutrients: ["Fiber, total dietary"] },
			Protein: { color: "#d45924", quantity: 0, nutrients: ["Protein"] },
			// Water: { color: "#03c2fc", quantity: 0, nutrients: ["Water"] },
			// Others: { color: "#e7d3fe", quantity: 0, nutrients: ["Others"] }
		}

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
				Object.values(results[index].specs).forEach((spec) => {
					if (spec.nutrients.includes(nutrient.label)) {
						other = false
						spec.quantity += quantity
					}
				})
			}
		}
	}
	const toggleDarkMode = () => {
		if (!dark) {
			document.documentElement.classList.add("mode-dark")
			localStorage.setItem("dark", 'true')
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
		timer = setTimeout(() => getData(lastIndex), 750)
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
	detectMobile()
	getData(lastIndex)
</script>

<form class="w-full">
	<!-- Toggle B -->
	<div class="flex items-center justify-center w-full mb-4 gap-2">
		<label for="toggleB" class="flex items-center cursor-pointer">
			<!-- toggle -->
			<div class="relative">
				<!-- input -->
				<input type="checkbox" on:click={toggleDarkMode} id="toggleB" class="sr-only" />
				<!-- line -->
				<div class="block bg-gray-600 w-14 h-8 rounded-full" />
				<!-- dot -->
				<div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
			</div>
		</label>
		<button type="button" class="flex items-center font-bold py-1 px-2 rounded" on:click={toggleCompare}>
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
				<div class="flex flex-col {compare ? 'w-1/2' : 'w-full'}">
					{#if !isEmptyObject(result.data) && (i == 0 || compare)}
						<Result {result} {dark} {compare} {isPhone} {i}/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
{/if}
