function curry(callback) {
    // Store all arguments passed so far
    function curried(...args) {

        // No arguments means the curry chain is complete
        if (args.length === 0) {
            return callback();
        }

        // Return a new function that collects more arguments
        function next(...nextArgs) {

            // Combine previous arguments with new arguments
            const allArgs = [...args, ...nextArgs];

            // No arguments means the curry chain is complete
            if (nextArgs.length === 0) {
                return callback(...args);
            }

            // Continue collecting arguments
            return curryWithArgs(allArgs);
        }

        return next;
    }

    // Helper function to continue the curry chain
    function curryWithArgs(allArgs) {
        return function (...newArgs) {

            // Empty call ends the chain
            if (newArgs.length === 0) {
                return callback(...allArgs);
            }

            // Add new arguments and continue
            return curryWithArgs([...allArgs, ...newArgs]);
        };
    }

    return curried;
}

module.exports = curry;
