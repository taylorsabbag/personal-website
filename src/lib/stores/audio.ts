import { writable } from 'svelte/store';

// Get initial state from localStorage, default to false if not set
const storedMuteState = typeof localStorage !== 'undefined' && localStorage.getItem('isMuted') === 'true';

export const isMuted = writable(storedMuteState);

// Subscribe to changes and update localStorage
if (typeof localStorage !== 'undefined') {
    isMuted.subscribe(value => {
        localStorage.setItem('isMuted', value.toString());
    });
} 