import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AudioPlayer from "@/components/blog/AudioPlayer";

describe("AudioPlayer", () => {
  it("renders a play button", () => {
    render(<AudioPlayer slug="test-post" />);
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("shows pause button after clicking play", async () => {
    const user = userEvent.setup();
    render(<AudioPlayer slug="test-post" />);
    await user.click(screen.getByRole("button", { name: /play/i }));
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  it("renders speed control options", () => {
    render(<AudioPlayer slug="test-post" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("changes playback rate when speed is selected", async () => {
    const user = userEvent.setup();
    render(<AudioPlayer slug="test-post" />);
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "1.5");
    expect(select).toHaveValue("1.5");
  });
});
