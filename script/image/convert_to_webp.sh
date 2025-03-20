#!/bin/bash

# Function to display usage instructions
usage() {
  echo "Usage: $0 [--quality <quality>]"
  echo "Convert all images in the current directory to WebP format."
  echo
  echo "Options:"
  echo "  --quality     Compression quality (optional, default is 75)"
  exit 1
}

# Default quality
QUALITY=75

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --quality)
      if [[ -z "$2" || "$2" =~ ^- ]]; then
        echo "Error: Missing or invalid value for --quality option."
        usage
      fi
      QUALITY="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      usage
      ;;
  esac
done

# Output directory for converted images
OUTPUT_DIR="./converted/"

# Check if there are image files in the current directory
shopt -s nullglob
FILES=(*.{jpg,jpeg,png})
if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No matching image files found in the current directory. Please ensure there are '.jpg', '.jpeg', or '.png' files present."
  exit 1
fi
shopt -u nullglob

# Ensure the output directory exists
if [[ ! -d "$OUTPUT_DIR" ]]; then
  mkdir -p "$OUTPUT_DIR"
fi

# Process each image file
for INPUT in "${FILES[@]}"; do
  # Extract filename and create output WebP file
  FILENAME=$(basename "$INPUT")
  BASENAME="${FILENAME%.*}" # Strip extension
  OUTPUT_FILE="$OUTPUT_DIR/${BASENAME}.webp"

  # Convert image to WebP
  echo "Converting $INPUT to $OUTPUT_FILE with quality $QUALITY..."
  cwebp -q "$QUALITY" "$INPUT" -o "$OUTPUT_FILE"

  # Check for success
  if [[ $? -eq 0 ]]; then
    echo "Conversion completed: $OUTPUT_FILE"
  else
    echo "Error: Conversion failed for $INPUT."
  fi
done

echo "All images processed."