const promptPanel = document.querySelector("#prompt-panel");
const promptForm = document.querySelector("#search-prompt-form");
const promptField = document.querySelector("#search-prompt");
const submitBtn = document.querySelector("#search-prompt-submit");
const statusEl = document.querySelector("#search-prompt-status");

function setStatus(message, visible = true) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.hidden = !visible || !message;
}

promptPanel?.addEventListener("toggle", () => {
  if (promptPanel.open) {
    promptField?.focus();
  }
});

async function submitPrompt(event) {
  event.preventDefault();

  const prompt = promptField?.value.trim() ?? "";
  if (!prompt) {
    setStatus("Enter a search prompt.");
    promptField?.focus();
    return;
  }

  setStatus("Sending…");
  submitBtn.disabled = true;

  try {
    const response = await fetch("/api/search/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus(typeof payload.error === "string" ? payload.error : "Could not send prompt.");
      return;
    }

    setStatus("Prompt received by the server.");
  } catch {
    setStatus("Network error. Try again.");
  } finally {
    submitBtn.disabled = false;
  }
}

promptForm?.addEventListener("submit", submitPrompt);