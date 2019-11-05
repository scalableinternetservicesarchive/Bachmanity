#!/bin/bash
if [ "${PROCESS}" = "WEB" ]; then
  
  . /opt/elasticbeanstalk/hooks/common.sh

  EB_SUPPORT_FILES=$(/opt/elasticbeanstalk/bin/get-config container -k support_files_dir)

  EB_CONFIG_DOCKER_ENV_ARGS=()

  while read -r ENV_VAR; do
    EB_CONFIG_DOCKER_ENV_ARGS+=(--env "$ENV_VAR")
  done < <($EB_SUPPORT_FILES/generate_env)

  echo "Running migrations for aws_beanstalk/staging-app"
  docker run --rm "${EB_CONFIG_DOCKER_ENV_ARGS[@]}" aws_beanstalk/staging-app bundle exec rake db:migrate || echo "The Migrations failed to run."
fi
true
