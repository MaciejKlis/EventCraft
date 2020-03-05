module.exports = {
  name: 'eventcraft-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/eventcraft-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
