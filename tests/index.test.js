const { isLocalHost, is127, allowOrigin, accessControl } = require('../src/index');

const testData = [
    'http://localhost',
    'https://localhost',
    'http://127.0.0.1',
    'https://127.0.0.1',
    'http://default.com',
    'http://not-allowed.com'
]

test('isLocalHost - should return true for localhost', () => {
    expect(isLocalHost(testData[0])).toBe(true);
    expect(isLocalHost(testData[1])).toBe(true);
});

test('isLocalHost - should return false for non-localhost', () => {
    expect(isLocalHost(testData[4])).toBe(false);
});

test('is127 - should return true for 127.0.0.1', () => {
    expect(is127(testData[2])).toBe(true);
    expect(is127(testData[3])).toBe(true);
});

test('is127 - should return false for non-127.0.0.1', () => {
    expect(is127(testData[4])).toBe(false);
});

test('allowOrigin - localhost with allow localhost = true (default)', () => {
    expect(allowOrigin(testData[0])).toBe(testData[0]);
    expect(allowOrigin(testData[1])).toBe(testData[1]);
    expect(allowOrigin(testData[2])).toBe(testData[2]);
    expect(allowOrigin(testData[3])).toBe(testData[3]);
});

test('allowOrigin - localhost with allow localhost = false', () => {
    expect(allowOrigin(testData[0], false, testData[4])).toBe(testData[4]);
    expect(allowOrigin(testData[1], false, testData[4])).toBe(testData[4]);
    expect(allowOrigin(testData[2], false, testData[4])).toBe(testData[4]);
    expect(allowOrigin(testData[3], false, testData[4])).toBe(testData[4]);
});

test('allowOrigin - not localhost', () => {
    expect(allowOrigin(testData[5], true, testData[4])).toBe(testData[4]);
    expect(allowOrigin(testData[5], false, testData[4])).toBe(testData[4]);
    expect(allowOrigin(testData[4], true, testData[4])).toBe(testData[4]);
    expect(allowOrigin(testData[4], false, testData[4])).toBe(testData[4]);
});

test('allowOrigin - default data', () => {
    expect(allowOrigin(undefined, undefined, testData[4])).toBe(testData[4]);
});

test('accessControl sets res object correctly', () => {
    const testRes = {
        set: jest.fn( (str1, str2) => ({ str1, str2 }))
    }
    accessControl('default', true)(testRes, 'origin');
    expect(testRes.set.mock.results).toMatchSnapshot();
});

test('accessControl default data', () => {
    const testRes = {
        set: jest.fn( (str1, str2) => ({ str1, str2 }))
    }
    accessControl(undefined, undefined)(testRes, undefined);
    expect(testRes.set.mock.results).toMatchSnapshot();
});
