#!/bin/bash

# any future command that fails will exit the script
set -e

mkdir -p ~/.ssh
echo -e "$PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# disable the host key checking.
touch ~/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config

# ssh into staging and deploy the app
echo "deploying to ${STAGING_SERVER}"
ssh ubuntu@${STAGING_SERVER} BRANCH=$CI_COMMIT_REF_NAME PROJECT=$CI_PROJECT_NAME 'bash -s' < ./deploy/update.sh