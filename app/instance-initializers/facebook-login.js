export function initialize(appInstance) {
    return appInstance.lookup('service:facebook-login');
}

export default {
    name: 'facebook-login',
    initialize,
};
