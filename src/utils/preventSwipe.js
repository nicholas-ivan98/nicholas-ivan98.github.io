import Hammer from 'hammerjs';

const HammerPlugin = {
    install(app) {
        app.directive('prevent-swipe', {
            mounted(el) {
                const hammer = new Hammer(el);
                hammer.get('swipe').set({
                    direction: Hammer.DIRECTION_HORIZONTAL
                });

                hammer.on('swipe', (event) => {
                    if (event.direction === Hammer.DIRECTION_RIGHT) {
                        event.preventDefault();
                    }
                });
            },
        });
    },
};

export default HammerPlugin;