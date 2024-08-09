<script lang="ts">
    import type {Basic} from "unsplash-js/dist/methods/photos/types"
    import {unsplash} from "$lib"

    // Components
    import Search from "../components/Search.svelte"
    import Pagination from "../components/Pagination.svelte"

    export const ssr = false

    const IMAGES_PER_PAGE = 9
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
</script>

<form action="">
    <input type="text" bind:value={searchText}>
    <button on:click={searchPhoto}>Search</button>
</form>
<div class="gallery">
    {#each images as image}
        <div>
            <img class="img" src={image.urls.regular} alt="">
        </div>
    {/each}
</div>

{#if totalPages}
    <Pagination bind:currentPage={currentPage} {totalPages}/>
{/if}

<style>
    .gallery {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      width: 80%;
      margin: 0 auto;

      gap: 1rem;
    }

    .img {
      max-height: 300px;
      max-width: 100%;
      background-color: #000;
      object-fit: fill;
    }
</style>