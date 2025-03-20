#!/bin/bash

# Function to display usage instructions
usage() {
  echo "Usage: $0 [--h264] [--vp9] [--av1] [--h265]"
  echo "Convert all video files in the current directory to specified Web video formats."
  echo
  echo "Options:"
  echo "  --h264     Generate H.264 codec videos (MP4 container)."
  echo "  --vp9      Generate VP9 codec videos (WebM container)."
  echo "  --av1      Generate AV1 codec videos (MP4 container)."
  echo "  --h265     Generate H.265 codec videos (MP4 container, two variants: hvc1 and hev1)."
  echo "By default, all formats are generated if no specific options are provided."
  exit 1
}

# Output directory for converted videos
OUTPUT_DIR="./converted/"

# Default flags to generate all formats
GENERATE_H264=false
GENERATE_VP9=false
GENERATE_AV1=false
GENERATE_H265=false

# Parse command-line arguments
if [[ "$#" -eq 0 ]]; then
  # If no arguments are provided, enable all formats by default
  GENERATE_H264=true
  GENERATE_VP9=true
  GENERATE_AV1=true
  GENERATE_H265=true
else
  # Process arguments to enable specific formats
  while [[ "$#" -gt 0 ]]; do
    case "$1" in
      --h264)
        GENERATE_H264=true
        shift
        ;;
      --vp9)
        GENERATE_VP9=true
        shift
        ;;
      --av1)
        GENERATE_AV1=true
        shift
        ;;
      --h265)
        GENERATE_H265=true
        shift
        ;;
      *)
        echo "Unknown option: $1"
        usage
        ;;
    esac
  done
fi

# Check if there are video files in the current directory
shopt -s nullglob
FILES=(*.{mp4,mkv,mov})
if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No matching video files found in the current directory. Please ensure there are '.mp4', '.mkv', or '.mov' files present."
  exit 1
fi
shopt -u nullglob

# Process each video file
for INPUT in "${FILES[@]}"; do
  # Ensure the output directory exists
  if [[ ! -d "$OUTPUT_DIR" ]]; then
    mkdir -p "$OUTPUT_DIR"
  fi

  # Extract filename and create output file names
  FILENAME=$(basename "$INPUT")
  BASENAME="${FILENAME%.*}" # Strip extension

  echo "Processing $INPUT..."

  # Convert to H.264 format if enabled
  if [[ "$GENERATE_H264" == true ]]; then
    ffmpeg -i "$INPUT" -vf "scale=1920:1080" -c:v libx264 -preset slow -crf 23 -an "$OUTPUT_DIR/${BASENAME}_h264.mp4" &&
    echo "Successfully converted to H.264: ${BASENAME}_h264.mp4"
  fi

  # Convert to VP9 format if enabled
  if [[ "$GENERATE_VP9" == true ]]; then
    ffmpeg -i "$INPUT" -vf "scale=1920:1080" -c:v libvpx-vp9 -b:v 0 -crf 30 -an "$OUTPUT_DIR/${BASENAME}_vp9.webm" &&
    echo "Successfully converted to VP9: ${BASENAME}_vp9.webm"
  fi

  # Convert to AV1 format if enabled
  if [[ "$GENERATE_AV1" == true ]]; then
    ffmpeg -i "$INPUT" -vf "scale=1920:1080" -c:v libaom-av1 -crf 30 -b:v 0 -an "$OUTPUT_DIR/${BASENAME}_av1.mp4" &&
    echo "Successfully converted to AV1: ${BASENAME}_av1.mp4"
  fi

  # Convert to H.265 formats if enabled
  if [[ "$GENERATE_H265" == true ]]; then
    ffmpeg -i "$INPUT" -vf "scale=1920:1080" -c:v libx265 -preset slow -crf 28 -tag:v hvc1 -an "$OUTPUT_DIR/${BASENAME}_h265_hvc1.mp4" &&
    echo "Successfully converted to H.265 (hvc1): ${BASENAME}_h265_hvc1.mp4"

    ffmpeg -i "$INPUT" -vf "scale=1920:1080" -c:v libx265 -preset slow -crf 28 -tag:v hev1 -an "$OUTPUT_DIR/${BASENAME}_h265_hev1.mp4" &&
    echo "Successfully converted to H.265 (hev1): ${BASENAME}_h265_hev1.mp4"
  fi

  # Check the success of the last command and handle errors
  if [[ $? -eq 0 ]]; then
    echo "Requested formats successfully created for $INPUT."
  else
    echo "Error: Conversion failed for $INPUT."
  fi
done

echo "All videos processed."