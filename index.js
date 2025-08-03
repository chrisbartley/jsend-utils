const {default: httpStatusCodes} = require('http-status');

/**
 * Creates and returns JSend success object.
 *
 * @param {*} data wrapper for any data returned by the API call. If the call returns no data, this parameter should be
 * set to <code>null</code>.
 * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 200 (OK).  If specified, it
 * should be an HTTP status code in the range [200, 299].
 */
const createJSendSuccess = function(data, httpStatus) {
   httpStatus = httpStatus || httpStatusCodes.OK;
   return {
      code: httpStatus,
      status: 'success',
      data: data
   }
};

/**
 * Creates and returns JSend object for a client error, for when an API call is rejected due to invalid data or call
 * conditions.
 *
 * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
 * wrong.
 * @param {*} data details of why the request failed. If the reasons for failure correspond to POST values, the response
 * object's keys SHOULD correspond to those POST values. Can be <code>null</code>.
 * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 400 (Bad Request). If
 * specified, it should be an HTTP status code in the range [400, 499].
 */
const createJSendClientError = function(message, data, httpStatus) {
   httpStatus = httpStatus || httpStatusCodes.BAD_REQUEST;
   return {
      code: httpStatus,
      status: 'error',   // JSend actually calls for "fail", but that seems counterintuitive and wrong
      data: data,
      message: message
   }
};

/**
 * Creates and returns JSend object for a client validation error, for when an API call is rejected due to a data
 * validation error.  The code will be HTTP status code 422 (Unprocessable Entity).
 *
 * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
 * wrong.
 * @param {*} data details of why the request failed. If the reasons for failure correspond to POST values, the response
 * object's keys SHOULD correspond to those POST values. Can be <code>null</code>.
 */
const createJSendClientValidationError = function(message, data) {
   return createJSendClientError(message, data, httpStatusCodes.UNPROCESSABLE_ENTITY);
};

/**
 * Creates and returns JSend object for a server failure error, for when an API call fails due to an error on the
 * server.
 *
 * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
 * wrong.
 * @param {*} [data] A generic container for any other information about the error, i.e. the conditions that caused the
 * error, stack traces, etc. Can be <code>null</code>.
 * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 500 (Internal Server Error).
 * If specified, it should be an HTTP status code in the range [500, 599].
 */
const createJSendServerError = function(message, data, httpStatus) {
   httpStatus = httpStatus || httpStatusCodes.INTERNAL_SERVER_ERROR;
   return {
      code: httpStatus,
      status: 'fail',  // JSend actually calls for "error", but that seems counterintuitive and wrong
      data: data,
      message: message
   };
};

/**
 * Decorates the given Express response by adding the following methods. You should only need to call this once.
 * <ul>
 *    <li>
 *       <h4 class="name">jsendSuccess(data, httpStatus)</h4>
 *       <p>Sets the HTTP status and sends a JSend success response, for when an API call is successful.</p>
 *       <table class="params">
 *          <thead>
 *             <tr>
 *                <th>Name</th>
 *                <th>Type</th>
 *                <th>Attributes</th>
 *                <th class="last">Description</th>
 *             </tr>
 *          </thead>
 *          <tbody>
 *             <tr>
 *                <td class="name">data</td>
 *                <td class="type">*</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">wrapper for any data returned by the API call. If the call returns no data, this parameter should be set to <code>null</code>.</td>
 *             </tr>
 *             <tr>
 *                <td class="name">httpStatus</td>
 *                <td class="type">number</td>
 *                <td class="attributes">&lt;optional&gt;</td>
 *                <td class="description last">the HTTP status code to use for the response, defaults to 200 (OK).  If specified, it should be an HTTP status code in the range [200, 299].</td>
 *             </tr>
 *          </tbody>
 *       </table>
 *    </li>
 *    <li>
 *       <h4 class="name">jsendClientError(message, data, httpStatus)</h4>
 *       <p>Sets the HTTP status and sends a JSend response for a client error, for when an API call is rejected due to invalid data or call conditions.</p>
 *       <table class="params">
 *          <thead>
 *             <tr>
 *                <th>Name</th>
 *                <th>Type</th>
 *                <th>Attributes</th>
 *                <th class="last">Description</th>
 *             </tr>
 *          </thead>
 *          <tbody>
 *             <tr>
 *                <td class="name">message</td>
 *                <td class="type">string</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.</td>
 *             </tr>
 *             <tr>
 *                <td class="name">data</td>
 *                <td class="type">*</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">details of why the request failed. If the reasons for failure correspond to POST values, the response object's keys SHOULD correspond to those POST values. Can be <code>null</code>.</td>
 *             </tr>
 *             <tr>
 *                <td class="name">httpStatus</td>
 *                <td class="type">number</td>
 *                <td class="attributes">&lt;optional&gt;</td>
 *                <td class="description last">the HTTP status code to use for the response, defaults to 400 (Bad Request). If specified, it should be an HTTP status code in the range [400, 499].</td>
 *             </tr>
 *          </tbody>
 *       </table>
 *    </li>
 *    <li>
 *       <h4 class="name">jsendClientValidationError(message, data)</h4>
 *       <p>Sets the HTTP status and sends a JSend response for a client validation error, for when an API call is rejected due to a data validation error.  The code will be HTTP status code 422 (Unprocessable Entity).</p>
 *       <table class="params">
 *          <thead>
 *             <tr>
 *                <th>Name</th>
 *                <th>Type</th>
 *                <th>Attributes</th>
 *                <th class="last">Description</th>
 *             </tr>
 *          </thead>
 *          <tbody>
 *             <tr>
 *                <td class="name">message</td>
 *                <td class="type">string</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.</td>
 *             </tr>
 *             <tr>
 *                <td class="name">data</td>
 *                <td class="type">*</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">details of why the request failed. If the reasons for failure correspond to POST values, the response object's keys SHOULD correspond to those POST values. Can be <code>null</code>.</td>
 *             </tr>
 *          </tbody>
 *       </table>
 *    </li>
 *    <li>
 *       <h4 class="name">jsendServerError(message, data, httpStatus)</h4>
 *       <p>Sets the HTTP status and sends a JSend response for a server error, for when an API call fails due to an error on the server.</p>
 *       <table class="params">
 *          <thead>
 *             <tr>
 *                <th>Name</th>
 *                <th>Type</th>
 *                <th>Attributes</th>
 *                <th class="last">Description</th>
 *             </tr>
 *          </thead>
 *          <tbody>
 *             <tr>
 *                <td class="name">message</td>
 *                <td class="type">string</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.</td>
 *             </tr>
 *             <tr>
 *                <td class="name">data</td>
 *                <td class="type">*</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">A generic container for any other information about the error, i.e. the conditions that caused the error, stack traces, etc. Can be <code>null</code>.</td>
 *             </tr>
 *             <tr>
 *                <td class="name">httpStatus</td>
 *                <td class="type">number</td>
 *                <td class="attributes">&lt;optional&gt;</td>
 *                <td class="description last">the HTTP status code to use for the response, defaults to 500 (Internal Server Error). If specified, it should be an HTTP status code in the range [500, 599].</td>
 *             </tr>
 *          </tbody>
 *       </table>
 *    </li>
 *    <li>
 *       <h4 class="name">jsendPassThrough(jsendResponse)</h4>
 *       <p>Useful for passing a JSend response from a third party system along to the caller.  This method simply picks
 *       the HTTP status code from the given <code>jsendResponse</code>, sets the response to that status code, and then
 *       send the <code>jsendResponse</code>.</p>
 *       <table class="params">
 *          <thead>
 *             <tr>
 *                <th>Name</th>
 *                <th>Type</th>
 *                <th>Attributes</th>
 *                <th class="last">Description</th>
 *             </tr>
 *          </thead>
 *          <tbody>
 *             <tr>
 *                <td class="name">jsendResponse</td>
 *                <td class="type">string|object</td>
 *                <td class="attributes">&nbsp;</td>
 *                <td class="description last">The JSend response to pass through</td>
 *             </tr>
 *          </tbody>
 *       </table>
 *    </li>
 * </ul>
 * @param {obj} response Express response
 */
const decorateExpressResponse = function(response) {
   /**
    * Sets the HTTP status and sends a JSend success response, for when an API call is successful.
    *
    * @param {*} data wrapper for any data returned by the API call. If the call returns no data, this parameter should be
    * set to <code>null</code>.
    * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 200 (OK).  If specified, it
    * should be an HTTP status code in the range [200, 299].
    */
   response['jsendSuccess'] = function(data, httpStatus) {
      const jsendObj = createJSendSuccess(data, httpStatus);
      return this.status(jsendObj.code).json(jsendObj);
   };

   /**
    * Sets the HTTP status and sends a JSend response for a client error, for when an API call is rejected due to invalid
    * data or call conditions.
    *
    * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
    * wrong.
    * @param {*} data details of why the request failed. If the reasons for failure correspond to POST values, the response
    * object's keys SHOULD correspond to those POST values. Can be <code>null</code>.
    * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 400 (Bad Request). If
    * specified, it should be an HTTP status code in the range [400, 499].
    */
   response['jsendClientError'] = function(message, data, httpStatus) {
      const jsendObj = createJSendClientError(message, data, httpStatus);
      return this.status(jsendObj.code).json(jsendObj);
   };

   /**
    * Sets the HTTP status and sends a JSend response for a client validation error, for when an API call is rejected due
    * to a data validation error.  The code will be HTTP status code 422 (Unprocessable Entity).
    *
    * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
    * wrong.
    * @param {*} data details of why the request failed. If the reasons for failure correspond to POST values, the response
    * object's keys SHOULD correspond to those POST values. Can be <code>null</code>.
    */
   response['jsendClientValidationError'] = function(message, data) {
      const jsendObj = createJSendClientValidationError(message, data);
      return this.status(jsendObj.code).json(jsendObj);
   };

   /**
    * Sets the HTTP status and sends a JSend response for a server error, for when an API call fails due to an error on
    * the server.
    *
    * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
    * wrong.
    * @param {*} [data] A generic container for any other information about the error, i.e. the conditions that caused the
    * error, stack traces, etc. Can be <code>null</code>.
    * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 500 (Internal Server Error).
    * If specified, it should be an HTTP status code in the range [500, 599].
    */
   response['jsendServerError'] = function(message, data, httpStatus) {
      const jsendObj = createJSendServerError(message, data, httpStatus);
      return this.status(jsendObj.code).json(jsendObj);
   };

   /**
    * Useful for passing a JSend response from a third party system along to the caller.  This method simply picks the
    * HTTP status code from the given <code>jsendResponse</code>, sets the response to that status code, and then send
    * the <code>jsendResponse</code>.
    *
    * @param {string|object} jsendResponse The JSend response to pass through
    */
   response['jsendPassThrough'] = function(jsendResponse) {
      if (typeof jsendResponse === 'string') {
         jsendResponse = JSON.parse(jsendResponse);
      }
      return this.status(jsendResponse['code']).json(jsendResponse);
   };
};

/**
 * Creates an instance of a <code>JSendError</code> with the given JSend object (<code>jsendObj</code>).  The message
 * for the error will be taken from the given <code>jsendObj</code>, or default to "Error" if the message is undefined.
 * Use this error when you need to pass an error back to the caller, but want to provide more details about the error
 * within a JSend object.
 *
 * @param {object} jsendObj Extra data about the error, in the form of a JSend object.  Will be saved in this instance's
 * <code>data</code> property.
 * @constructor
 */
class JSendError extends Error {
   constructor(jsendObj = {}) {
      super();

      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, JSendError);
      }

      this.name = this.constructor.name;
      this.data = jsendObj;
      this.message = (jsendObj && jsendObj.message) ? jsendObj.message : 'Error';
   }
}

/**
 * Creates an instance of a <code>JSendClientError</code> containing a JSend object describing the error.  This class
 * is a subclass of <code>JSendError</code>.
 *
 * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
 * wrong.
 * @param {*} data details of why the request failed. If the reasons for failure correspond to POST values, the response
 * object's keys SHOULD correspond to those POST values. Can be <code>null</code>.
 * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 400 (Bad Request). If
 * specified, it should be an HTTP status code in the range [400, 499].
 * @constructor
 */
class JSendClientError extends JSendError {
   constructor(message, data, httpStatus) {
      super();

      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, JSendClientError);
      }

      this.name = this.constructor.name;
      this.data = createJSendClientError(message, data, httpStatus);
      this.message = this.data.message || "Client Error";
   }
}

/**
 * Creates an instance of a <code>JSendClientValidationError</code> containing a JSend object describing the error.
 * This class is a subclass of <code>JSendClientError</code>.  The contained JSend object will have a status code of
 * 422 (Unprocessable Entity).
 *
 * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
 * wrong.
 * @param {*} data details of why the request failed. If the reasons for failure correspond to POST values, the response
 * object's keys SHOULD correspond to those POST values. Can be <code>null</code>.
 * @constructor
 */
class JSendClientValidationError extends JSendClientError {
   constructor(message, data) {
      super();

      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, JSendClientValidationError);
      }

      this.name = this.constructor.name;
      this.data = createJSendClientValidationError(message, data);
      this.message = this.data.message || "Validation Error";
   }
}

/**
 * Creates an instance of a <code>JSendServerError</code> containing a JSend object describing the error.  This class
 * is a subclass of <code>JSendError</code>.
 *
 * @param {string} message A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went
 * wrong.
 * @param {*} [data] A generic container for any other information about the error, i.e. the conditions that caused the
 * error, stack traces, etc. Can be <code>null</code>.
 * @param {number} [httpStatus] the HTTP status code to use for the response, defaults to 500 (Internal Server Error).
 * If specified, it should be an HTTP status code in the range [500, 599].
 * @constructor
 */
class JSendServerError extends JSendError {
   constructor(message, data, httpStatus) {
      super();

      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, JSendServerError);
      }

      this.name = this.constructor.name;
      this.data = createJSendServerError(message, data, httpStatus);
      this.message = this.data.message || "Server Error";
   }
}

module.exports.decorateExpressResponse = decorateExpressResponse;
module.exports.JSendError = JSendError;
module.exports.JSendClientError = JSendClientError;
module.exports.JSendClientValidationError = JSendClientValidationError;
module.exports.JSendServerError = JSendServerError;
