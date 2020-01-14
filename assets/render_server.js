require('@babel/polyfill')
require('@babel/register')({cwd: __dirname})

const ReactServer = require('react-dom/server')
const React = require('react')
const readline = require('readline')
const styled = require('styled-components')

function deleteCache(componentPath) {
  if (
    process.env.NODE_ENV !== 'production' &&
    require.resolve(componentPath) in require.cache
  ) {
    delete require.cache[require.resolve(componentPath)]
  }
}

function requireComponent(componentPath) {
  // remove from cache in non-production environments
  // so that we can see changes
  deleteCache(componentPath)

  return require(componentPath)
}

function render(componentPath, props) {
  try {
    const component = requireComponent(componentPath)
    const element = component.default ? component.default : component
    const createdElement = React.createElement(element, props)

    const sheet = new styled.ServerStyleSheet();

    const markup = ReactServer.renderToString(
      sheet.collectStyles(createdElement)
    );

    const styleTags = sheet.getStyleTags();

    const response = {
      error: undefined,
      markup: markup,
      component: element.name,
      style_tags: styleTags
    };
    
    return response
  } catch (err) {
    const response = {
      path: componentPath,
      error: {
        type: err.constructor.name,
        message: err.message,
        stack: err.stack,
      },
      markup: undefined,
      component: undefined,
      styleTags: undefined
    }

    return response
  }
}

module.exports = {
  render,
}
