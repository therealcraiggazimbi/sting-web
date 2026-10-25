# Video Compression Guide

Used before uploading course videos to Cloudinary.

## Requirements
- `ffmpeg` installed via Homebrew: `brew install ffmpeg`

## Command (single video)
```bash
ffmpeg -i "input.mp4" \
  -vf "scale=1280:720:flags=lanczos" \
  -c:v libx264 -crf 23 -preset medium \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  -y "output.mp4"
```

## Batch compress a full directory
Place all source videos in a folder, then run:

```bash
for f in "/path/to/source/folder/"*.mp4; do
  filename=$(basename "$f")
  out="/path/to/output/folder/$filename"
  ffmpeg -i "$f" \
    -vf "scale=1280:720:flags=lanczos" \
    -c:v libx264 -crf 23 -preset medium \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    -y "$out"
done
```

Output files keep the exact same filename as the source.

## Settings explained
| Flag | Value | Reason |
|---|---|---|
| `-vf scale=1280:720` | 720p | Good quality for lecture video, smaller file |
| `-crf 23` | Quality level | 0=lossless, 51=worst. 23 is visually transparent |
| `-preset medium` | Speed vs compression | Balance between encode speed and file size |
| `-b:a 128k` | Audio bitrate | Good enough for speech/lecture audio |
| `-movflags +faststart` | Web optimised | Moves metadata to front so video plays before fully downloaded |

## Quality tuning
- If files are still too large → increase CRF to `26` or `28`
- If you need better quality → decrease CRF to `20` or `18`
- Higher CRF = smaller file = lower quality
- Lower CRF = larger file = better quality
