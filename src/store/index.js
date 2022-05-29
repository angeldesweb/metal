import { authStore, userStore } from './auth';
import { loginRouter, RouterStore } from './router';

export const auth = authStore();
export const router = RouterStore();
export const user = userStore();
export const lrouter = loginRouter();