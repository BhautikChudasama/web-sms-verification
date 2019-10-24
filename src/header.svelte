<script>
import { isLoading } from "./stores.js";

let loading = false;

isLoading.subscribe((s) => {
        loading = s;
    })

</script>

<style>
.header {
    width: 100%;
    height: 56px;
    background-color: var(--primary-color);
    color: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
}
.header .title {
    padding-left: 18px;
    font-size: 16px;
}

.demo-container {
  width: 100%;
  margin: auto;
}

.progress-bar {
  height: 4px;
  background-color: #fdf028a8;
  width: 100%;
  overflow: hidden;
}

.progress-bar-value {
  width: 100%;
  height: 100%;
  background-color: #ff9800;
  animation: indeterminateAnimation 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminateAnimation {
  0% {
    transform:  translateX(0) scaleX(0);
  }
  40% {
    transform:  translateX(0) scaleX(0.4);
  }
  100% {
    transform:  translateX(100%) scaleX(0.5);
  }
}
</style>

<div>
    <header class="header">
        <div class="title">SMS Receiver API demo</div>
    </header>
    {#if loading}
      <div class="demo-container">
          <div class="progress-bar">
              <div class="progress-bar-value"></div>
          </div>
      </div>
    {/if}
</div>

