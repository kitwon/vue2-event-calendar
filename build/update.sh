#!/bin/bash

yarn deploy
git add -A
git commit -am 'oridinary update'
git push origin master
