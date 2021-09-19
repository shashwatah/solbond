import { readable, writable } from 'svelte/store';

export const connection = writable({});

export const wallet = writable({});

export const walletConnected = writable(false);

export const walletBtnValue = writable("Connect");

export const activeForm = writable("main");

export const registerData = writable({});

export const validateData = writable({});
