"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ps_tree_1 = __importDefault(require("ps-tree"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("end-child-processes");
function endChildProcesses(done) {
    ps_tree_1.default(process.pid, (err, children) => {
        if (err)
            return done(err);
        for (let i = 0; i < children.length; i++) {
            if (children[i].COMM === "ps")
                continue;
            debug(`ending child process: ${children[i].COMM}`);
            try {
                process.kill(children[i].PID);
            }
            catch (e) {
                debug(`cannot kill process ${children[i].COMM}: ${e.message}`);
            }
        }
        if (done)
            done();
    });
}
exports.endChildProcesses = endChildProcesses;
