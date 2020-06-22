module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-external-helpers",
    "@babel/plugin-proposal-class-properties",
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ]
}
