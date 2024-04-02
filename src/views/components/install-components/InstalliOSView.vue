<template>
    <div class="container">
        <!-- <h4 style="margin-top: 30px;">3. Install app in IOS</h4> -->
        <p>1. Tap SHARE button</p>
        <div class="img-container">
            <img :src="'/img/resources/install-ios1.png?v=' + Date.now()"></img>
        </div>
        <p>2. Tap Add to Home screen</p>
        <div class="img-container">
            <img :src="'/img/resources/install-ios2.png?v=' + Date.now()"></img>
        </div>
        <p>3. Tap Add</p>
        <div class="img-container">
            <img :src="'/img/resources/install-ios3.png?v=' + Date.now()"></img>
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

img {
    margin: 8px 8px 8px 8px;
    width: 100%;
    height: auto;
}

/* @media (min-width: 768px) {
    img {
        margin: 8px 8px 8px 8px;
        width: 100%;
        height: auto;
    }
} */

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