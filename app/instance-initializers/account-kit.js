export function initialize(appInstance) {
    return appInstance.lookup('service:account-kit');
}

export default {
    name: 'account-kit',
    initialize,
};
