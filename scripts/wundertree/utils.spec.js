const {expect} = require('chai');
const path = require('path');
const {zipByKey, readInputJson, formatTreeItemMessage} = require('./utils');

describe('Utils', () => {

  describe('when running zipByKey', () => {
    it('should convert collection, into indexed hash', () => {
      expect(zipByKey([{id: 1}, {id: 2}], 'id')).to.deep.equal({
        [1]: {id: 1},
        [2]: {id: 2}
      });
    });

    it('should return empty object if empty aray passed', () => {
      expect(zipByKey([], 'id')).to.deep.equal({});
    });
  });

  describe('when running readInputJson', () => {
    it('should read json by a provided path', () => {
      expect(readInputJson(path.join(__dirname, './data/test-input.json')))
        .to.deep.equal({status: 200})
    });
  });

  describe('when running formatTreeItemMessage', () => {
    it('should return FOLDER message ', () => {
      expect(formatTreeItemMessage({
        type: 'folder',
        title: 'test'
      }, 0)).to.deep.equal('FOLDER: test\n');
    });

    it('should return LIST message ', () => {
      expect(formatTreeItemMessage({
        type: 'list',
        title: 'test'
      }, 0)).to.deep.equal('LIST: test\n');
    });

    it('should return TASK message ', () => {
      expect(formatTreeItemMessage({
        type: 'task',
        title: 'test'
      }, 0)).to.deep.equal('TASK: test\n');
    });

    it('should return TASK message with offset depending of the depth', () => {
      expect(formatTreeItemMessage({
        type: 'task',
        title: 'test',
        starred: false
      }, 2)).to.deep.equal('    TASK: test\n');
    });

    it('should return TASK message with start at the end if starred is true', () => {
      expect(formatTreeItemMessage({
        type: 'task',
        title: 'test',
        starred: true
      }, 2)).to.deep.equal('    TASK: test (*)\n');
    });
  });

});
