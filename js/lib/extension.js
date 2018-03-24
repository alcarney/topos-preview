// This file was copied from the following cookie cutter template on Github
// https://github.com/jupyter-widgets/widget-cookiecutter

// It appears to load the extension when the notebook is first opened
if (window.require) {
    window.require.config({
        map: {
            "*": {
                "topos-previewjs": "nbextensions/topos-previewjs/index"
            }
        }
    });
}

// Export the require load function - which apparently doesn't have to do anything
module.exports = {
    load_ipython_extension: function() {}
};
