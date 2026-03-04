#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="${BLOG_SOURCE_DIR:-$HOME/blog-source}"
BRANCH="${BLOG_BRANCH:-main}"
REMOTE="${BLOG_REMOTE:-origin}"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory not found: $SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$ROOT_DIR/content/posts" "$ROOT_DIR/static/images"

# Sync content from source directory.
rsync -a --delete "$SOURCE_DIR/posts/" "$ROOT_DIR/content/posts/"
# Do not use --delete here, otherwise it may remove content/posts.
rsync -a "$SOURCE_DIR/pages/" "$ROOT_DIR/content/"
rsync -a --delete "$SOURCE_DIR/images/" "$ROOT_DIR/static/images/"

# Normalize file permissions after syncing from cross-platform mounts.
find "$ROOT_DIR/content" "$ROOT_DIR/static/images" -type f -exec chmod 644 {} +
find "$ROOT_DIR/content" -type d -exec chmod 755 {} +
find "$ROOT_DIR/static/images" -type d -exec chmod 755 {} +

# Keep about page as a standalone page instead of a post list item.
if [ -f "$ROOT_DIR/content/posts/about.md" ]; then
  mv "$ROOT_DIR/content/posts/about.md" "$ROOT_DIR/content/about.md"
fi

# Convert legacy relative image paths to Hugo static paths.
if [ -d "$ROOT_DIR/content/posts" ]; then
  find "$ROOT_DIR/content/posts" -name "*.md" -type f -print0 | xargs -0 sed -i 's#(../images/#(/images/#g'
fi

cd "$ROOT_DIR"

if git diff --quiet && git diff --cached --quiet; then
  echo "No content changes detected."
else
  git add -A
  COMMIT_MSG="${1:-chore: sync blog content $(date '+%Y-%m-%d %H:%M:%S')}"
  git commit -m "$COMMIT_MSG"
fi

git push "$REMOTE" "$BRANCH"
echo "Done: synced and pushed to $REMOTE/$BRANCH"
