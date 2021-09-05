import { readable, writable } from 'svelte/store';

export const wallet = writable({});

export const walletConnected = writable(false);