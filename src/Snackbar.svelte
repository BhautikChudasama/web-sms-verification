<script>
import { fly } from "svelte/transition"
export let title;
export let url;
export let linkTitle;

let showSnackbar = true;

setTimeout(() => {
    showSnackbar = !showSnackbar;
}, 4000);

</script>

<style>

.snackbar {
    width: 100%;
    position: fixed;
    bottom: 12px;
    animation: scl 60ms linear;
    transition: all 300ms linear;
    z-index: 8887;
}
@keyframes scl {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
.snackbar .snackbar-main {
    width: 85%;
    max-width: 90%;
    padding: 6px 16px;
    height: 42px;
    max-height: 48px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #333333;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
}
.snackbar .snackbar-main .title {
    font-family: Roboto, 'sans-serif';
    font-size: 14px;
    color: rgba(255, 255, 255, 0.87);
    letter-spacing: .0178571429em;
}
.snackbar .snackbar-main .action {
    padding: 10px 8px;
    font-family: Roboto, 'sans-serif';
    text-transform: capitalize;
    color: #bb86fc;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
}

.snackbar .snackbar-main .action:hover {
    background: rgba(0,0,0,0.5);
}

@media screen and (min-width: 768px) {
    .snackbar .snackbar-main {
        width: 376px;
    }
}

</style>

{#if showSnackbar}
<div class="snackbar" transition:fly="{{ y: 20, duration: 300 }}">
    <div class="snackbar-main">
        <div class="title">{title}</div>
        <a class="action" href={url} target="_blank">{linkTitle}</a>
    </div>
</div>
{/if}