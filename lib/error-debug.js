import React from 'react'
import ansiHTML from 'ansi-html'
import Head from './head'

export default ({ error, error: { name, message, module } }) => (
  <div style={styles.errorDebug}>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </Head>
    {module ? <div style={styles.heading}>Error in {module.rawRequest}</div> : null}
    {
      name === 'ModuleBuildError'
      ? <pre style={styles.stack} dangerouslySetInnerHTML={{ __html: ansiHTML(encodeHtml(message)) }} />
      : <StackTrace error={error} />
    }
  </div>
)

const StackTrace = ({ error: { name, message, stack } }) => (
  <div>
    <div style={styles.heading}>{message || name}</div>
    <pre style={styles.stack}>
      {stack}
    </pre>
  </div>
)

const styles = {
  errorDebug: {
    background: '#a6004c',
    boxSizing: 'border-box',
    overflow: 'auto',
    padding: '15px',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999
  },

  stack: {
    fontFamily: '"SF Mono", "Roboto Mono", "Fira Mono", consolas, menlo-regular, monospace',
    fontSize: '13px',
    color: '#fbe7f1',
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    marginTop: '20px'
  },

  heading: {
    fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#febfdd',
    marginBottom: '5px'
  }
}

const encodeHtml = str => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// see color definitions of babel-code-frame:
// https://github.com/babel/babel/blob/master/packages/babel-code-frame/src/index.js

ansiHTML.setColors({
  reset: ['fff', 'a6004c'],
  darkgrey: 'e54590',
  yellow: 'ee8cbb',
  green: 'f2a2c7',
  magenta: 'fbe7f1',
  blue: 'fff',
  cyan: 'ef8bb9',
  red: 'fff'
})
