import { readable, writable } from 'svelte/store';

export const activeForm = writable("main");

export const wallet = writable({});

export const walletConnected = writable(false);

export const registerData = writable({});

export const validateData = writable({});
