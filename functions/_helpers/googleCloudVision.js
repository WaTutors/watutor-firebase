// NOTE function name derived from https://vision.googleapis.com/v1/images:annotate

exports.annotate = async (gcsSourceUri) => {
  const { ImageAnnotatorClient } = require('@google-cloud/vision');
  const client = new ImageAnnotatorClient();
  const [result] = await client.textDetection(gcsSourceUri);
  // FIXME const result = require('../../tests/response.json');
  return result;
};
