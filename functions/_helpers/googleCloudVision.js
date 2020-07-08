// NOTE function name derived from https://vision.googleapis.com/v1/images:annotate

exports.annotate = async (gcsSourceUri) => {
  const { ImageAnnotatorClient } = require('@google-cloud/vision');
  const client = new ImageAnnotatorClient();
  let result = null;
  try {
    // result = require('../../tests/response.json'); // NOTE Jesse's local testing
    const [textDetectionResult] = await client.textDetection(gcsSourceUri);
    result = textDetectionResult;
  } catch (err) {
    result = { error: err };
  }
  return result;
};
