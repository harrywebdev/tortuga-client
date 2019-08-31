export default function checkboxValidator(opts) {
    return (key, newValue /*, oldValue, changes, content*/) => {
        if (newValue === true) {
            return true;
        }

        return opts.message;
    };
}
