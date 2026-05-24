#!/usr/bin/env bash
# Usage: bash scripts/generate-audio.sh <slug>
# Requires conda or mamba with conda-forge channel.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_NAME="blog-audio"

if [ -z "$1" ]; then
  echo "Usage: bash scripts/generate-audio.sh <slug>"
  echo "       npm run audio <slug>"
  exit 1
fi

# Check espeak-ng (required by kokoro for phonemization on macOS)
if ! command -v espeak-ng &>/dev/null; then
  echo "espeak-ng not found. Install with: brew install espeak-ng"
  exit 1
fi

# Check ffmpeg
if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

# Pick conda or mamba (prefer mamba)
CONDA_CMD=""
if command -v mamba &>/dev/null; then
  CONDA_CMD="mamba"
elif command -v conda &>/dev/null; then
  CONDA_CMD="conda"
else
  echo "conda or mamba not found."
  echo "Install with: brew install miniforge"
  exit 1
fi

# Create conda env if it doesn't exist
if ! conda env list | grep -q "^${ENV_NAME} "; then
  echo "Creating conda environment '${ENV_NAME}' from conda-forge..."
  "$CONDA_CMD" create -n "$ENV_NAME" -c conda-forge python=3.12 numpy scipy -y
  echo "Installing kokoro and soundfile..."
  conda run -n "$ENV_NAME" pip install kokoro soundfile
fi

# Verify kokoro importable; reinstall if environment is broken
if ! conda run -n "$ENV_NAME" python -c "import kokoro" 2>/dev/null; then
  echo "kokoro not importable — reinstalling..."
  conda run -n "$ENV_NAME" pip install --force-reinstall kokoro
fi

conda run -n "$ENV_NAME" python "$SCRIPT_DIR/generate-audio.py" "$1"
