<template>
    <div class="container">
        <!-- <h4>1. Install app in Desktop</h4> -->
        <p>1. Click on the icon <img :src="'/img/resources/install.png?v=' + Date.now()"></img> and choose Install button</p>
        <div class="img-container">
            <img class="img-desktop" :src="'/img/resources/install-desktop.png?v=' + Date.now()"></img>
        </div>
    </div>
</template>
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

img.img-desktop {
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