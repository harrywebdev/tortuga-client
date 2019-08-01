export function initialize(appInstance) {
    const orderState = appInstance.lookup('service:order-state');
    orderState.initCustomerFromLocalStorage();
}

export default {
    initialize,
};
