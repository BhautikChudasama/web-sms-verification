import { writable } from "svelte/store";

export let isLoading = writable(false);
export let verifyPhase = writable(false);
export let verified = writable(false);