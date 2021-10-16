import Vue from 'vue';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/theme-borderless/borderless.min.css';

/**
 * A little workaround to add toast mixin
 * Usage with: this.$swal.toast(options)
 */

Swal.toastMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        container: 'swal2-container-no-backdrop'
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

Swal.confirmMixin = Swal.mixin({
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: `Continue`,
    confirmButtonColor: '#016937',
    denyButtonText: `Agree`
})

Swal.toast = function(options) {
    return Swal.toastMixin.fire(options);
}

Swal.confirm = function(options) {
    return Swal.confirmMixin.fire(options);
}

const SwalPlugin = {
    install(vue, options = {}) {
        var _a;
        const swalLocalInstance = Swal.mixin(options);
        const swalFunction = function (...args) {
            return swalLocalInstance.fire.call(swalLocalInstance, ...args);
        };
        Object.assign(swalFunction, Swal);
        Object.keys(Swal)
            //@ts-ignore
            .filter(key => typeof Swal[key] === 'function')
            .forEach(methodName => {
            //@ts-ignore
            swalFunction[methodName] = swalLocalInstance[methodName].bind(swalLocalInstance);
        });
        // add the instance method
        if (((_a = vue.config) === null || _a === void 0 ? void 0 : _a.globalProperties) && !vue.config.globalProperties.$swal) {
            // vue 3
            vue.config.globalProperties.$swal = swalFunction;
            vue.provide('$swal', swalFunction);
        }
        else if (!Object.prototype.hasOwnProperty.call(vue, '$swal')) {
            // vue 2
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            vue.prototype.$swal = swalFunction;
            vue['swal'] = swalFunction;
        }
    }
}

Vue.use(SwalPlugin);