var easyPdf = require('../index.js');
var fs = require("fs");

test('return value is base64', callback => {
    easyPdf.create({}, function (result) {
        expect(isBase64(result.pdf)).toBe(true);
        callback();
    });
});

test('if pdf file is stored locally', async () => {
    const data = {};
    const result = await easyPdf.create(data);
    await fs.writeFileSync("sample.pdf", result.pdf, 'base64');
    expect(fs.existsSync("sample.pdf")).toBe(true);
    await fs.unlinkSync("sample.pdf");
    expect(fs.existsSync("sample.pdf")).toBe(false);
});

function isBase64(str) {
    if (str === '' || str.trim() === '') {
        return false;
    }
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}
