#!/bin/bash

# =============================================
# 构建开发环境容器服务控制脚本
# =============================================

# -------------------------------
# 全局配置
# -------------------------------
SCRIPT_DIR=$(dirname "$0")
PROJECT_DIR=$(dirname "${SCRIPT_DIR}")
ENV_FILE="${PROJECT_DIR}/docker/.env.dev"

# -------------------------------
# 颜色配置
# -------------------------------
source "${SCRIPT_DIR}/colors.sh"

# -------------------------------
# 品牌显示
# -------------------------------
print_icon() {
  source "${SCRIPT_DIR}/branch.sh" && print_icon
}

# -------------------------------
# 帮助信息
# -------------------------------
print_help() {
  echo -e "${BRIGHT_GREEN}使用说明：${RESET}"
  echo -e "  dev.sh [选项]"
  echo
  echo -e "${BRIGHT_GREEN}选项说明：${RESET}"
  echo -e "  ${YELLOW}-h${RESET}   显示帮助信息"
  echo -e "  ${YELLOW}-d${RESET}   以守护进程模式启动容器（后台运行）"
  echo
  echo -e "${BRIGHT_GREEN}示例：${RESET}"
  echo -e "  # 前台启动开发服务"
  echo -e "  $ ./dev.sh\n"
  echo -e "  # 后台启动开发服务"
  echo -e "  $ ./dev.sh -d\n"
  echo -e "  # 显示帮助信息"
  echo -e "  $ ./dev.sh -h"
  exit 0
}

# =============================================
# 参数解析
# =============================================
BACKGROUND_MODE=0

# 解析命令行参数
while getopts "hd" opt; do
  case $opt in
    h)
      print_icon
      print_help
      ;;
    d)
      BACKGROUND_MODE=1
      ;;
    \?)
      echo -e "${BRIGHT_RRED}错误：无效的选项 -$OPTARG${RESET}" >&2
      exit 1
      ;;
  esac
done

# =============================================
# 主执行流程
# =============================================

# 显示品牌图标
print_icon

# -------------------------------
# 环境预检
# -------------------------------
echo -e "${BRIGHT_MAGENTA}\n⚙  检查 Docker 环境...${RESET}"
if ! command -v docker &> /dev/null; then
  echo -e "${BRIGHT_RED}❌ 错误：未检测到 Docker 安装${RESET}"
  exit 1
fi
echo -e "${BRIGHT_GREEN}✓ Docker 已就绪${RESET}"

# -------------------------------
# 配置预览
# -------------------------------
echo -e "${BRIGHT_CYAN}\n🔧 合并 Docker Compose 配置...${RESET}"
echo -e "${YELLOW}══════════════════════════════════════════${RESET}"
docker compose -f "${PROJECT_DIR}/docker/docker-compose.base.yaml" \
               -f "${PROJECT_DIR}/docker/docker-compose.dev.yaml" \
               --env-file "${ENV_FILE}" config > "${PROJECT_DIR}/.temp/docker-compose.dev.config.yaml"
echo -e "配置文件保存至临时文件路径：${BRIGHT_BLUE}${PROJECT_DIR}/.temp/docker-compose.dev.config.yaml${RESET}"
echo -e "${YELLOW}══════════════════════════════════════════${RESET}"

# -------------------------------
# 服务启动
# -------------------------------
echo -e "${BRIGHT_BLUE}\n🚀 启动开发容器服务...${RESET}"
CMD_ARGS=(
  -f "${PROJECT_DIR}/docker/docker-compose.base.yaml"
  -f "${PROJECT_DIR}/docker/docker-compose.dev.yaml"
  --env-file "${ENV_FILE}"
)

if [ "${BACKGROUND_MODE}" -eq 1 ]; then
  echo -e "${BRIGHT_YELLOW}▶ 以守护进程模式启动${RESET}"
  docker compose "${CMD_ARGS[@]}" up -d
else
  echo -e "${BRIGHT_YELLOW}▶ 以前台模式启动${RESET}"
  docker compose "${CMD_ARGS[@]}" up
fi