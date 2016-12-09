const {expect} = require('chai');
const path = require('path');
const fs = require('fs');
const {wunderTree, formatTaskTree} = require('./wundertree');

const expectedOutput = fs.readFileSync(path.join(__dirname, './data/expected_output.txt'), 'utf8');

describe('Wundertree', () => {

  it('should output expected message', () => {
    expect(formatTaskTree(wunderTree, 0, '')).to.deep.equal(expectedOutput);
  });
});
