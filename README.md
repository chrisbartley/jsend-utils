# JSend Utils

Simple helper functions for producing [JSend](http://labs.omniti.com/labs/jsend) objects and responses. 

It's important to mention that this implementation differs from the JSend spec in the naming of errors.  The spec uses the term *fail* for a problem with the submitted data or an unsatisfied precondition.  It used the term *error* for a server-side error. I think their terminology is backwards--the caller can correct an error, but not a failure. So, in this implementation, the `status` field will be `error` for client errors, and `fail` for server-side failures. 

## Installation


Install this module in the usual way:

    npm install jsend-utils
        
## Usage

To decorate Express's response with methods you can use to return JSend responses, do the following (you'll only need
to do this once, typically in your main app.js):

    require('./lib/jsend').decorateExpressResponse(require('express').response);
        
Sometimes it's useful for server-side code to return an error to another server-side caller, but provide more details about what went wrong, and do so in the JSend format, making it easier to return a JSend response to the client side.  The four Error subclasses provided by this module are intended for that use case.
 
For full documentation, generate the JSDocs:

    npm run-script api-docs
    
You'll find the generated docs in the `out` directory.