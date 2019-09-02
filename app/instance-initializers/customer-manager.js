export function initialize(appInstance) {
    const customerManager = appInstance.lookup('service:customer-manager');
    customerManager.initCustomerFromLocalStorage();
}

export default {
    initialize,
};
