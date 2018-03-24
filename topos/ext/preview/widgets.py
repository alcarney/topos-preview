import ipywidgets as widgets
from traitlets import Unicode, validate


@widgets.register
class HelloWidget(widgets.DOMWidget):

    _view_name = Unicode("HelloView").tag(sync=True)
    _view_module = Unicode("topos-previewjs").tag(sync=True)
    _view_module_version = Unicode("0.1.0").tag(sync=True)

    value = Unicode("Hello, World!").tag(sync=True)
