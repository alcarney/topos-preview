from setuptools import setup, find_packages


def readme():
    with open("README.rst") as f:
        return f.read()


exec(open('topos/ext/preview/version.py', 'r').read())


setup(name='topos-preview',
      version=__version__,
      description="Widget for Jupyter Notebooks that allows for previewing topos Mesh objects",
      long_description=readme(),
      classifiers=[
          'Development Status :: 3 - Alpha',
          'License :: OSI Approved :: MIT License',
          'Programming Language :: Python :: 3.5',
          'Programming Language :: Python :: 3.6',
          'Programming Language :: Python :: 3 :: Only',
          'Topic :: Multimedia :: Graphics'
      ],
      author='Alex Carney',
      author_email="alcarneyme@gmail.com",
      license='MIT',
      packages=find_packages(exclude="tests"),
      install_requires=[
          'topos',
          'jupyter'
      ],
      setup_requires=['pytest-runner'],
      test_suite='tests',
      tests_require=['pytest', 'hypothesis'],
      python_requires='>=3.0',
      include_package_data=True,
      zip_safe=False)
