SCRIPT_DIR=$(dirname "$0")
PROJECT_DIR=$(dirname "${SCRIPT_DIR}")
ENV_FILE=".env.prod"

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ghcr.io/scienceol/docs:latest \
  $(grep -v '^#' ${env_file} | xargs -I % echo "--build-arg %") \
  --push \
  .