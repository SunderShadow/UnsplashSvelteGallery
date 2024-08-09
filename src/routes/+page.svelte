<script lang="ts">
    import type {Basic} from "unsplash-js/dist/methods/photos/types"
    import {unsplash} from "$lib"

    // Components
    import Masonry from "svelte-bricks";
    import Pagination from "../components/Pagination.svelte"

    export const ssr = false

    const IMAGES_PER_PAGE = 20
    let searchText  = ''

    let currentPage = 1
    let totalPages  = 0

    let images: Basic[] = []

    function searchPhoto() {
        currentPage = 1
        unsplash.search.getPhotos({query: searchText, perPage: IMAGES_PER_PAGE})
            .then(result => {
                images = result.response?.results ?? []
                totalPages = result.response?.total_pages ?? 0
            })
    }

    function toPage(pageNum: number) {
        if (!searchText) return

        unsplash.search.getPhotos({query: searchText, perPage: IMAGES_PER_PAGE, page: pageNum})
            .then(result => {
                images = result.response?.results ?? []
            })
    }

    $: toPage(currentPage)

    let [minColWidth, maxColWidth, gap] = [275, 700, 20]
</script>

<form action="">
    <input type="text" bind:value={searchText}>
    <button on:click={searchPhoto}>Search</button>
</form>
<Masonry
        {minColWidth} {maxColWidth} {gap}
        items={images}
        let:item
>
    <img src={item.urls.regular} alt="">
</Masonry>

{#if totalPages}
    <Pagination bind:currentPage={currentPage} {totalPages}/>
{/if}

<style>
    img {
      max-width: 100%;
      background-color: #000;
      object-fit: fill;
    }
</style>