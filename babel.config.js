module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      "@babel/env", {
        targets: {
          ios: "12",
          firefox: "63"
        }
      }
    ]
  ];

  return { presets }
}