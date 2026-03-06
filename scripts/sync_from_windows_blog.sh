#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="${1:-/mnt/c/Users/spring/OneDrive/文档/blog}"

POSTS_SRC="$SRC_DIR/posts"
IMAGES_SRC="$SRC_DIR/images/post-images"
POSTS_DST="$ROOT_DIR/content/posts"
IMAGES_DST="$ROOT_DIR/static/images/post-images"

if [[ ! -d "$POSTS_SRC" ]]; then
  echo "Source posts directory not found: $POSTS_SRC" >&2
  exit 1
fi

mkdir -p "$POSTS_DST" "$IMAGES_DST"

# Replace all posts from source recursively while keeping local section index.
find "$POSTS_DST" -mindepth 1 -maxdepth 1 ! -name '_index.md' -exec rm -rf {} +
mkdir -p "$POSTS_DST"
rsync -a --delete --include '*/' --include '*.md' --exclude '*' "$POSTS_SRC"/ "$POSTS_DST"/

if [[ ! -f "$POSTS_DST/_index.md" ]]; then
  cat > "$POSTS_DST/_index.md" <<'EOT'
---
date: 2026-03-05T10:00:00+08:00
draft: true
---
EOT
fi

# Sync post images (source of truth).
if [[ -d "$IMAGES_SRC" ]]; then
  rsync -a --delete "$IMAGES_SRC"/ "$IMAGES_DST"/
fi

# Ensure each post has front matter so Hugo can render it.
while IFS= read -r -d '' post; do
  first_line="$(head -n 1 "$post" || true)"
  if [[ "$first_line" != "---" ]]; then
    title="$(basename "${post%.md}")"
    tmp="$(mktemp)"
    {
      echo "---"
      echo "title: \"$title\""
      echo "date: $(date +'%Y-%m-%dT%H:%M:%S%:z')"
      echo "---"
      echo
      cat "$post"
    } > "$tmp"
    mv "$tmp" "$post"
  fi
done < <(find "$POSTS_DST" -type f -name '*.md' ! -name '_index.md' -print0 | sort -z)

# Assign unique covers deterministically: sorted posts <-> sorted images.
posts_file="$(mktemp)"
images_file="$(mktemp)"
sel_images_file="$(mktemp)"
map_file="$(mktemp)"

find "$POSTS_DST" -type f -name '*.md' ! -name '_index.md' | sort > "$posts_file"
find "$ROOT_DIR/static/images/post-images" "$ROOT_DIR/static/images/hero" -maxdepth 1 -type f \
  | rg -i '\.(png|jpg|jpeg|webp|gif)$' \
  | sort > "$images_file"

post_count="$(wc -l < "$posts_file")"
image_count="$(wc -l < "$images_file")"

if [[ "$image_count" -lt "$post_count" ]]; then
  echo "Not enough images for unique covers: posts=$post_count images=$image_count" >&2
  exit 1
fi

head -n "$post_count" "$images_file" > "$sel_images_file"
paste "$posts_file" "$sel_images_file" > "$map_file"

while IFS=$'\t' read -r post img; do
  cover="${img#$ROOT_DIR/static/}"
  awk -v cover="$cover" '
    NR==1 && $0=="---" { in_fm=1; print; next }
    in_fm==1 {
      if ($0=="---") {
        print "cover: \"" cover "\""
        print
        in_fm=0
        next
      }
      if ($0 ~ /^cover:[[:space:]]*/) next
      print
      next
    }
    { print }
  ' "$post" > "$post.tmp" && mv "$post.tmp" "$post"
done < "$map_file"

awk -F'\t' -v root="$ROOT_DIR/static/" '{sub("^" root, "", $2); print "- " $2}' "$map_file" > "$ROOT_DIR/data/covers.yml"

echo "Synced posts=$post_count images_used=$post_count from $SRC_DIR"
