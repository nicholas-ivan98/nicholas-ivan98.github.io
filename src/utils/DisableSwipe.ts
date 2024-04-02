import { createGesture } from '@ionic/vue';

export const DisableSwipeBackDirective = {
    beforeMount(el: any) {
        console.log('ahhihihi', el)
        const gesture = createGesture({
            el,
            threshold: 0,
            gestureName: 'goback-swipe',
            gesturePriority: 40.5,
            onMove: () => console.log()
        });
        gesture.enable(true);
    }
};