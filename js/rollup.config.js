import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/compiled/index.js",
    output: [{
        file: "super.js",
        format: "iife",
        name: 'superJS'
    }],
    plugins: [
        replace({"ENVIRONMENT": JSON.stringify("production")}),
        resolve(),
        commonjs(),
        terser({
            ecma: 6,
            module: true
        })
    ]
}