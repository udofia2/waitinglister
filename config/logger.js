// const pino = require('pino');
import pino from "pino";
import logger from "pino-http";

const log = logger({
  // Reuse an existing logger instance
  logger: pino(),

  // Define a custom request id function
  genReqId(req) {
    return req.id;
  },

  // Define custom serializers
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },

  // Set to `false` to prevent standard serializers from being wrapped.
  wrapSerializers: true,

  // Logger level is `info` by default
  useLevel: "info",

  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,

  // Define a custom logger level
  // customLogLevel(res, err) {
  //   if (res.statusCode >= 400 && res.statusCode < 500) {
  //     return "warn";
  //   }
  //   if (res.statusCode >= 500 || err) {
  //     return "error";
  //   }
  //   if (res.statusCode >= 300 && res.statusCode < 400) {
  //     return "silent";
  //   }
  //   return "info";
  // },

  // Define a custom success message
  customSuccessMessage(res) {
    if (res.statusCode === 404) {
      return "resource not found";
    }
    return "request completed";
  },

  // Define a custom receive message
  customReceivedMessage(req, _res) {
    return `request received: ${req.method}`;
  },

  // Define a custom error message
  customErrorMessage(error, res) {
    return `request errored with status code: ${res.statusCode}`;
  },
  // Override attribute keys for the log object
  customAttributeKeys: {
    req: "request",
    res: "response",
    err: "error",
    responseTime: "timeTaken",
  },

  // Define additional custom request properties
  customProps(req, res) {
    return {
      customProp: req.customProp,
      // user request-scoped data is in res.locals for express applications
      customProp2: res.locals.myCustomData,
    };
  },
});

export default log;