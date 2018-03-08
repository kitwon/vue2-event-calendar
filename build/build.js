const fs = require('fs')
const rollup = require('rollup')
const uglify = require('uglify-js')
const less = require('rollup-plugin-less')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const { name, version } = require('../package.json')
const babelrc = require('./babelrc')

const banner = `/*!
  * ${name}.js v${version}
  * (c) ${new Date().getFullYear()} Kitwang Chen
  * Released under the MIT License.
  */`

async function build(params) {
  const bundle = await rollup.rollup({
    input: 'src/calendar.js',
    plugins: [
      less({
        output: 'dist/' + name + '.css'
      }),
      resolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      babel({
        babelrc: false,
        ...babelrc
      })
    ]
  })

  await bundle.write({
    file: `dist/${name}.js`,
    format: 'cjs'
  })

  const { code } = await bundle.generate({ format: 'cjs' })
  const minify = banner + '\n' + uglify.minify(code).code
  write(`dist/${name}.min.js`, minify)
}

function write(dest, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, content, err => {
      if (err) reject(err)
      console.log(blue(dest) + ' ' + getSize(content))
      resolve()
    })
  })
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

build()
