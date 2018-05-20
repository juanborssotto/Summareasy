"use strict";
var Config_1 = require("./Config");
var ContentTransformer_1 = require("./ContentTransformer");
var GulpTransformStream_1 = require("./GulpTransformStream");
function gulpTransform(arg0, arg1) {
    var config = Config_1.Config.fromPluginArguments(arg0, arg1);
    var transformer = ContentTransformer_1.ContentTransformer.fromConfig(config);
    var transformFunction = transformer.makeTransformFunction();
    return new GulpTransformStream_1.GulpTransformStream(transformFunction);
}
module.exports = gulpTransform;
//# sourceMappingURL=index.js.map