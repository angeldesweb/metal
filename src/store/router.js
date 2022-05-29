import { writable } from 'svelte/store';

export const RouterStore = () => {
    const { subscribe , set } = writable('home');
    return {
        subscribe,
        navigateTo: route => set(route)
    }
}

export const loginRouter = () => {
    const { subscribe , set } = writable('signin');
    return {
        subscribe,
        navigateTo: route => set(route)
    }
}

