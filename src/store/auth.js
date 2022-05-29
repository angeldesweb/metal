import { writable } from 'svelte/store';

let initialValues = {
    uid:'',
    verified:false,
    role:''
}

export const authStore = () => {
    const { subscribe , set } = writable(false);
    return {
        subscribe,
        authenticate:() => set(true),
        deauthenticate:() => set(false)
    }
}

export const userStore = () => {
    const { subscribe , update } = writable(initialValues);

    return {
        subscribe,
        setUser:args => update(store => (store = {...store,...args.data}))
    }

}