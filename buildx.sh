env_file=".env.prod"

grep -v '^#' ${env_file} | xargs -I % echo "--build-arg %"

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ghcr.io/scienceol/docs:latest \
  $(grep -v '^#' ${env_file} | xargs -I % echo "--build-arg %") \
  --push \
  .
