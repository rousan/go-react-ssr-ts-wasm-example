#!/bin/bash

set -e

ENV="$1"

cd "/root/app-${ENV}"
git checkout main && git pull
tusk up:detached
