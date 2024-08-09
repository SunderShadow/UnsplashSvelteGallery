// place files you want to import through the `$lib` alias in this folder.
import { createApi } from "unsplash-js";
import { PUBLIC_ACCESS_KEY } from "$env/static/public"

export let unsplash = createApi({
    accessKey: PUBLIC_ACCESS_KEY
})
