const path = require('path');

const ROOT = path.join(__dirname, '../../');
const SOURCE_PATH = ROOT + 'src';


const indexTemplatePath = path.join(SOURCE_PATH, '/index.html');
const clientManifestFileName = 'vue-ssr-client-manifest.json';
const serverBundleFileName = 'vue-ssr-server-bundle.json';

module.exports = {
    ROOT,
    SOURCE_PATH,
    clientManifestFileName,
    serverBundleFileName
};
