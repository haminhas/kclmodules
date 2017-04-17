/* eslint-disable no-unused-vars */
// test setup file from project completed at Red-Badger
import 'babel-polyfill';
import { jsdom } from 'jsdom';
import chai from 'chai';
import chaiGen from 'chai-generator';
import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonAsPromised from 'sinon-as-promised';
import sinonChai from 'sinon-chai';
import hook from 'css-modules-require-hook';


const noop = () => (null);

require.extensions['.svgi'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.png'] = noop;

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

global.document = jsdom('');
global.window = global.document.defaultView;

chai.use(chaiGen);
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(dirtyChai);
global.expect = chai.expect;
global.sinon = sinon;
global.navigator = {
  userAgent: 'node.js',
};
