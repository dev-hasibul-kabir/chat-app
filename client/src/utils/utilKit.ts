export function formatChatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  if (date >= today) {
    // Today → only time
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } else if (date >= yesterday) {
    // Yesterday
    return "Yesterday";
  } else if (date >= oneWeekAgo) {
    // Within this week → weekday (Mon, Tue…)
    return date.toLocaleDateString([], { weekday: "long" });
  } else {
    // Older → date (Aug 23, 2025)
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
    });
  }
}

//play notification Sound
export const playNotification = () => {
  const audio = new Audio("/notification.mp3");
  audio.play().catch((err) => console.log("Audio play failed:", err));
};
