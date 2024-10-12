export const formatTime = (dateString) => {
  const date = new Date(dateString);

  const localTime = new Date(date.getTime());

  const now = new Date();
  const sameDay = now.toDateString() === localTime.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (sameDay) {
    return localTime.toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else if (localTime.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (now.getFullYear() === localTime.getFullYear()) {
    return localTime.toLocaleDateString("en-PK", {
      weekday: "long",
    });
  } else {
    return localTime.toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};
