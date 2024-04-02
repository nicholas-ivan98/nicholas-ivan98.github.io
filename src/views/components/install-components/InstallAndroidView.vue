<template>
    <div class="container">
        <!-- <h4 style="margin-top: 30px;">2. Install app in Android</h4> -->
        <p>1. Tap the menu icon (3 dots in upper right-hand corner) and tap Add to home screen</p>
        <div class="img-container">
            <img :src="'/img/resources/install-android1.png?v=' + Date.now()"></img>
        </div>
        <p>2. Tap ADD</p>
        <div class="img-container">
            <img :src="'/img/resources/install-android2.png?v=' + Date.now()"></img>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
p {
    margin: 8px 8px 8px 8px;
    font-size: large;
}

.img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    margin: 8px 8px 8px 8px;
    width: 100%;
    height: auto;
}

.container {
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

@media (min-width: 768px) {
    .container {
        display: flex;
        margin: auto;
        flex-direction: column;
        justify-content: center;
        width: 50%;
    }
}
</style>