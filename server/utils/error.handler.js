import SafeErrorResponse from './safe.error.response';

export default (err, req, res, next) => {
  //output the error, so we can see what it is in the console
  console.log('Server error:', err);

  //default error and code
  let errMsg = 'A server error occurred';
  let code = 500;

  //if we specify this type as our error, it means that we desire to send a safe message to the user
  //(e.g. without stack traces and other possible vulnerabilities)
  if (err instanceof SafeErrorResponse) {
    errMsg = err.message;
    code = err.code;
  } else if (err.name === 'ValidationError') {
    //if it's mongoose's validation, grab the first error and send the corresponding error message
    let firstError = Object.keys(err.errors)[0];
    errMsg = err.errors[firstError].message
  }

  res.status(code).send(errMsg);
};
