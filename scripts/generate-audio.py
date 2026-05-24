#!/usr/bin/env python3
"""
Generate audio for a blog post using Kokoro TTS.

Usage:
    python scripts/generate-audio.py <slug>
    python scripts/generate-audio.py aws-summit-2025-agentic-ai-production

Requirements (install once):
    pip install kokoro soundfile numpy scipy
    brew install ffmpeg
"""

import sys
import os
import re
import subprocess
import tempfile

def strip_mdx(text: str) -> str:
    """Remove MDX/Markdown formatting and return clean readable prose."""
    # Remove YAML frontmatter
    text = re.sub(r"^---[\s\S]*?---\n", "", text, flags=re.MULTILINE)
    # Remove fenced code blocks (including mermaid)
    text = re.sub(r"```[\s\S]*?```", "", text)
    # Remove inline code
    text = re.sub(r"`[^`]+`", lambda m: m.group(0)[1:-1], text)
    # Remove HTML/MDX tags
    text = re.sub(r"<[^>]+>", "", text)
    # Remove heading markers but keep text
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    # Remove bold/italic markers
    text = re.sub(r"\*{1,3}([^*]+)\*{1,3}", r"\1", text)
    text = re.sub(r"_{1,3}([^_]+)_{1,3}", r"\1", text)
    # Keep link text, remove URL
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    # Remove blockquote markers
    text = re.sub(r"^>\s*", "", text, flags=re.MULTILINE)
    # Remove horizontal rules
    text = re.sub(r"^---+$", "", text, flags=re.MULTILINE)
    # Remove table pipes and alignment rows
    text = re.sub(r"^\|[-:| ]+\|$", "", text, flags=re.MULTILINE)
    text = re.sub(r"\|", " ", text)
    # Remove image syntax
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    # Remove italics disclaimer markers
    text = re.sub(r"^\*(.+)\*$", r"\1", text, flags=re.MULTILINE)
    # Collapse multiple blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def generate(slug: str) -> None:
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mdx_path = os.path.join(project_root, "content", "blog", f"{slug}.mdx")
    audio_dir = os.path.join(project_root, "public", "audio")
    output_path = os.path.join(audio_dir, f"{slug}.mp3")

    if not os.path.exists(mdx_path):
        print(f"Error: {mdx_path} not found")
        sys.exit(1)

    os.makedirs(audio_dir, exist_ok=True)

    with open(mdx_path, "r", encoding="utf-8") as f:
        raw = f.read()

    text = strip_mdx(raw)
    word_count = len(text.split())
    print(f"Generating audio for '{slug}' ({word_count} words)...")

    try:
        from kokoro import KPipeline
        import numpy as np
        import soundfile as sf
    except ImportError:
        print("Missing dependencies. Run: pip install kokoro soundfile numpy")
        sys.exit(1)

    pipeline = KPipeline(lang_code="a")  # American English
    chunks = []
    for _gs, _ps, audio in pipeline(text, voice="af_heart", speed=1.0):
        chunks.append(audio)

    if not chunks:
        print("Error: no audio generated")
        sys.exit(1)

    audio_data = np.concatenate(chunks)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav_path = tmp.name

    sf.write(wav_path, audio_data, 24000)

    result = subprocess.run(
        ["ffmpeg", "-y", "-i", wav_path, "-codec:a", "libmp3lame", "-qscale:a", "4", output_path],
        capture_output=True,
        text=True,
    )
    os.unlink(wav_path)

    if result.returncode != 0:
        print(f"ffmpeg error:\n{result.stderr}")
        sys.exit(1)

    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    duration_min = word_count / 150  # ~150 words per minute
    print(f"Done: {output_path}")
    print(f"Size: {size_mb:.1f} MB  |  Estimated duration: {duration_min:.1f} min")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/generate-audio.py <slug>")
        sys.exit(1)
    generate(sys.argv[1])
