#!/bin/bash

ROOT=$(pwd)


cd $ROOT/js
npm install

cd $ROOT
pip install -e .
