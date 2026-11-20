#!/usr/bin/env bash
# Build a versioned Android APK on EAS and publish it as a GitHub Release.
#
#   scripts/release.sh              build on EAS, then release
#   scripts/release.sh --build-id <id>   skip building, release an existing finished EAS build
#
# Requires: eas-cli login (npx eas-cli whoami), gh login, a clean git tree,
# and `npm run data` having been run so the verse data is present for the build.
# Version comes from app.json "expo.version"; the tag is v<version>.
set -euo pipefail
cd "$(dirname "$0")/.."

: "${GH_CONFIG_DIR:=$HOME/.config/gh-personal}"; export GH_CONFIG_DIR
export EAS_SUPPRESS_REQUIRE_COMMIT_EASIGNORE_WARNING=1
REPO="KousthubhaKrishna/gita"

VERSION=$(node -p "require('./app.json').expo.version")
TAG="v$VERSION"
BUILD_ID=""
[[ "${1:-}" == "--build-id" ]] && BUILD_ID="$2"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "error: commit or stash changes before releasing" >&2; exit 1
fi
if gh release view "$TAG" -R "$REPO" >/dev/null 2>&1; then
  echo "error: release $TAG already exists. Bump expo.version in app.json first." >&2; exit 1
fi
if [[ ! -d src/data/verses ]]; then
  echo "error: src/data/verses missing. Run: npm run data" >&2; exit 1
fi

if [[ -z "$BUILD_ID" ]]; then
  echo "▶ Building $TAG on EAS (android, preview profile = APK) ..."
  BUILD_ID=$(npx eas-cli build --platform android --profile preview --non-interactive --json \
    | node -p "const b=JSON.parse(require('fs').readFileSync(0,'utf8')); (Array.isArray(b)?b[0]:b).id")
fi

echo "▶ Fetching artifact for build $BUILD_ID ..."
URL=$(npx eas-cli build:view "$BUILD_ID" --json | node -p "JSON.parse(require('fs').readFileSync(0,'utf8')).artifacts.buildUrl")
VC=$(npx eas-cli build:view "$BUILD_ID" --json | node -p "JSON.parse(require('fs').readFileSync(0,'utf8')).appBuildVersion")
OUT=$(mktemp -d)
APK="$OUT/gita-$TAG.apk"
curl -fsSL -o "$APK" "$URL"
( cd "$OUT" && shasum -a 256 "$(basename "$APK")" > SHA256SUMS.txt )
SIZE=$(du -h "$APK" | cut -f1)

echo "▶ Tagging $TAG and creating GitHub release ..."
git tag -a "$TAG" -m "Release $TAG" 2>/dev/null || true
git push origin "$TAG"
NOTES=$(cat <<MD
**భగవద్గీత $TAG** · Android APK · versionCode $VC · $SIZE

### Install on Android
1. Download \`gita-$TAG.apk\` below on your phone.
2. Open it. When Android asks, allow installing from this source (one-time).
3. Done. The app is fully offline; no account, no network.

Verify: \`shasum -a 256 gita-$TAG.apk\` should match \`SHA256SUMS.txt\`.

Built with EAS from commit $(git rev-parse --short HEAD). The verse text and commentary
are third-party works under their own licences; see README "Data & licences".
MD
)
gh release create "$TAG" "$APK" "$OUT/SHA256SUMS.txt" -R "$REPO" --title "$TAG" --notes "$NOTES" --latest
echo "✔ https://github.com/$REPO/releases/tag/$TAG"
