#!/bin/bash

set -e

IGNORE_PACKAGES=("eslint-config" "typescript-config")

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PACKAGES_DIR="$ROOT_DIR/packages"

echo "Publishing packages..."

for package_dir in "$PACKAGES_DIR"/*; do
  package_name=$(basename "$package_dir")
  
  skip=false
  for ignore_pkg in "${IGNORE_PACKAGES[@]}"; do
    if [ "$package_name" = "$ignore_pkg" ]; then
      skip=true
      break
    fi
  done
  
  if [ "$skip" = false ]; then
    echo "Publishing $package_name..."
    pnpm dlx pkg-pr-new publish --pnpm "$package_dir"
    echo "$package_name published successfully!"
  else
    echo "Skipping $package_name as it's in the ignore list."
  fi
done

echo "All packages published successfully!"
