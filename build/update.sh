#!/bin/bash

yarn deploy
git add -A
git commit -m 'oridinary update'
git push origin dev
npm deploy
