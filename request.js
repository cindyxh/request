const https = require("https");
const { stringify } = require("querystring");
const { stringInterpolation } = require("./util");

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    buildHeaders(options);
    // buildAgent(options);
    buildFormData(options);
    buildUrlInterpolation(options);
    buildQueryString(options);

    if (
      process.env.DEBUG_LOG &&
      process.env.DEBUG_LOG.toLowerCase() === "true"
    ) {
      console.log({
        ...options,
        headers: { ...options.headers },
      });
    }

    const req = https.request(options.url, options, (res) => {
      let resData = "";
      res.on("data", (chunk) => {
        resData += chunk;
      });
      res.on("end", () => {
        const { statusCode, statusMessage } = res;
        if (statusCode >= 400) {
          const error = new Error(statusMessage);
          error.statusCode = statusCode;
          error.data = toJson(resData);
          return reject(error);
        }
        const response = resData ? toJson(resData) : {};

        if (options.resolveWithFullResponse) {
          return resolve({ statusCode, statusMessage, response });
        }
        return resolve(response);
      });
    });

    req.on("error", (error) => {
      return reject(error);
    });
    const { body } = options;
    if (body) {
      req.write(typeof body === "object" ? JSON.stringify(body) : body);
    }
    req.end();
  });
};
function buildHeaders(options) {
  options.headers = options.headers || {};
}

// function buildAgent(options) {
//   const { agentOptions } = options;
//   if (agentOptions) {
//     options.agent = new https.Agent(agentOptions);
//     delete options.agentOptions;
//   }
// }

function buildFormData(options) {
  const { form } = options;
  if (form) {
    options.body = stringify(form);
    options.headers["Content-Type"] = "application/x-www-form-urlencoded";
    options.headers["Content-Length"] = options.body.length;
    delete options.form;
  }
}

function buildQueryString(options) {
  const { qs, url } = options;
  if (qs) {
    options.url = `${url}?${stringify(qs)}`;
    delete options.qs;
  }
}

function buildUrlInterpolation(options) {
  const { urlParams, url } = options;
  if (urlParams) {
    options.url = stringInterpolation(url, urlParams);
    delete options.urlParams;
  }
}
function toJson(input) {
  try {
    return JSON.parse(input);
  } catch (ex) {
    return input;
  }
}
