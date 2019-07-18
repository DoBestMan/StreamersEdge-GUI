import ValidationUtil from '../ValidationUtil';
import {GenUtil} from '../';

const translate = GenUtil.translate;


test('fileSize - fail', () => {
  const fileSizeFail = {
    size: 1025000
  };

  const result = ValidationUtil.fileSize(fileSizeFail);
  expect(result).toBe(translate('errors.profile.maxFileSize'));
});

test('fileSize - pass', () => {
  const fileSizePass = {
    size: 1023000
  };

  const result = ValidationUtil.fileSize(fileSizePass);
  expect(result).toBe(null);
});

test('fileType - jpeg pass', () => {
  const fileTypePass = {
    type: 'image/jpeg'
  };

  const result = ValidationUtil.imageType(fileTypePass);
  expect(result).toBe(null);
});

test('fileType - png pass', () => {
  const fileTypePass = {
    type: 'image/png'
  };

  const result = ValidationUtil.imageType(fileTypePass);
  expect(result).toBe(null);
});

test('fileType - fail', () => {
  const fileTypePass = {
    type: 'image/gif'
  };

  const result = ValidationUtil.imageType(fileTypePass);
  expect(result).toBe(translate('errors.profile.imageTypeUnsupported'));
});



