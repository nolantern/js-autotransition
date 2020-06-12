/**
 * @copyright Copyright 2020 nolantern
 * https://github.com/nolantern
 */

var AutoTransition = (function () {
    let autoTransitionMethods = {};

    /**
     * @ignore Internal function
     * Performs transition from current width/height to 'auto' on passed element.
     * @param {string} dimension - Dimension to transit. 'height' or 'width'.
     * @param {Element} elem - DOM element to transit.
     * @param {(string|number)} [duration=0.2s] - Transition duration in seconds.
     * @param {string} [timing=ease] - Timing-function.
     * @param {[string|number]} [delay=0s] - Transitions delay in seconds.
     * @param {function} [callback] - Callback to run after transition finished.
     */
    let dimensionToAuto = function (dimension, elem, duration = '0.2s', timing = 'ease', delay = '0s', callback) {

        const isH = dimension === 'height' ? true : false;

        const dur = (
            typeof duration === 'string' ? duration :
                typeof duration === 'number' ? duration + 's' : (
                    console.error('type error. \'duration\' has type: ' + typeof duration),
                    '0.2s'
                )
        )

        const tim = typeof timing === 'string' ? timing : (
            console.error('type error. \'timing\' has type: ' + typeof timing),
            'ease'
        )

        const del = (
            typeof delay === 'string' ? delay :
                typeof delay === 'number' ? delay + 's' : (
                    console.error('type error. \'delay\' has type: ' + typeof delay),
                    '0s'
                )
        )

        if (isH) {
            var prevHeight = elem.style.height
            elem.style.height = 'auto'
            var endHeight = getComputedStyle(elem).height
            elem.style.height = prevHeight
            elem.offsetHeight // force repaint
            elem.style.transition = 'height ' + dur + ' ' + tim + ' ' + del;
            elem.style.height = endHeight
        } else {
            var prevWidth = elem.style.width
            elem.style.width = 'auto'
            var endWidth = getComputedStyle(elem).width
            elem.style.width = prevWidth
            elem.offsetWidth // force repaint
            elem.style.transition = 'width ' + dur + ' ' + tim + ' ' + del;
            elem.style.width = endWidth
        }


        elem.addEventListener('transitionend', function transitionEnd(event) {
            if (event.propertyName == dimension) {
                elem.style.transition = ''
                isH ? elem.style.height = 'auto' : elem.style.width = 'auto';
                if (typeof callback === 'function') {
                    callback();
                }
                elem.removeEventListener('transitionend', transitionEnd, false)
            }
        }, false)
    }

    /**
     * @ignore internal function
     * Performs transition from width/height 'auto' to passed width/height (default = 0) on passed element.
     * @param {string} dimension - Dimension to transit. 'height' or 'width'.
     * @param {Element} elem - DOM element to transit.
     * @param {(string|number)} [length=0px] - Target widht/height. Numbers in px.
     * @param {(string|number)} [duration=0.2s] - Transition duration in seconds.
     * @param {string} [timing=ease] - Timing-function.
     * @param {[string|number]} [delay=0s] - Transitions delay in seconds.
     * @param {function} [callback] - Callback to run after transition finished.
     */

    let dimensionFromAuto = function (dimension, elem, length = '0px', duration = '0.2s', timing = 'ease', delay = '0s', callback) {

        const isH = dimension === 'height' ? true : false;

        const l = (
            typeof length === 'string' ? length :
                typeof length === 'number' ? length + 'px' : (
                    console.error('type error. \'lenght\' has type: ' + typeof length),
                    '0px'
                )
        )

        const dur = (
            typeof duration === 'string' ? duration :
                typeof duration === 'number' ? duration + 's' : (
                    console.error('type error. \'duration\' has type: ' + typeof duration),
                    '0.2s'
                )
        )

        const tim = typeof timing === 'string' ? timing : (
            console.error('type error. \'timing\' has type: ' + typeof timing),
            'ease'
        )

        const del = (
            typeof delay === 'string' ? delay :
                typeof delay === 'number' ? delay + 's' : (
                    console.error('type error. \'delay\' has type: ' + typeof delay),
                    '0s'
                )
        )

        if (isH) {
            elem.style.height = getComputedStyle(elem).height
            elem.style.transition = 'height ' + dur + ' ' + tim + ' ' + del;
            elem.offsetHeight // force repaint
            elem.style.height = l
        } else {
            elem.style.width = getComputedStyle(elem).width
            elem.style.transition = 'width ' + dur + ' ' + tim + ' ' + del;
            elem.offsetWidth // force repaint
            elem.style.width = l
        }

        if (typeof callback === 'function') {
            elem.addEventListener('transitionend', function transitionEnd(event) {
                if (event.propertyName === dimension) {
                    callback();
                    elem.removeEventListener('transitionend', transitionEnd, false)
                }
            }, false)
        }
    }

    /**
     * Performs transition from current width to 'auto' on passed element.
     * @param {Element} elem - DOM element to transit.
     * @param {(string|number)} [duration=0.2s] - Transition duration in seconds.
     * @param {string} [timing=ease] - Timing-function.
     * @param {[string|number]} [delay=0s] - Transitions delay in seconds.
     * @param {function} [callback] - Callback to run after transition finished.
     */
    autoTransitionMethods.widthToAuto = function (elem, duration, timing, delay, callback) {
        return dimensionToAuto('width', elem, duration, timing, delay, callback);
    }

    /**
     * Performs transition from width 'auto' to passed width (default = 0) on passed element.
     * @param {Element} elem - DOM element to transit.
     * @param {(string|number)} [width=0px] - Target width. Numbers in px.
     * @param {(string|number)} [duration=0.2s] - Transition duration in seconds.
     * @param {string} [timing=ease] - Timing-function.
     * @param {[string|number]} [delay=0s] - Transitions delay in seconds.
     * @param {function} [callback] - Callback to run after transition finished.
     */
    autoTransitionMethods.widthFromAuto = function (elem, width, duration, timing, delay, callback) {
        return dimensionFromAuto('width', elem, width, duration, timing, delay, callback);
    }

    /**
     * Performs transition from height 'auto' to passed height (default = 0) on passed element.
     * @param {Element} elem - DOM element to transit.
     * @param {(string|number)} [height=0px] - Target height. Numbers in px.
     * @param {(string|number)} [duration=0.2s] - Transition duration in seconds.
     * @param {string} [timing=ease] - Timing-function.
     * @param {[string|number]} [delay=0s] - Transitions delay in seconds.
     * @param {function} [callback] - Callback to run after transition finished.
     */
    autoTransitionMethods.heightFromAuto = function (elem, height, duration, timing, delay, callback) {
        return dimensionFromAuto('height', elem, height, duration, timing, delay, callback)
    }

    /**
     * Performs transition from current height to 'auto' on passed element.
     * @param {Element} elem - DOM element to transit.
     * @param {(string|number)} [duration=0.2s] - Transition duration in seconds.
     * @param {string} [timing=ease] - Timing-function.
     * @param {[string|number]} [delay=0s] - Transitions delay in seconds.
     * @param {function} [callback] - Callback to run after transition finished.
     */
    autoTransitionMethods.heightToAuto = function(elem, duration, timing, delay, callback) {
        return dimensionToAuto('height', elem, duration, timing, delay, callback)
    }

    return autoTransitionMethods;
})();