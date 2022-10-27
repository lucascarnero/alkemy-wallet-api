const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components");
const tags = require("./tags");

const rolesDoc = require("./roles");
const authDoc = require("./auth");
const userDoc = require("./users");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  paths: {
    ...rolesDoc,
    ...authDoc,
    ...userDoc,
  },
};
