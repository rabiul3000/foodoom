

const dateFormat = (date) => {
     const dateFormat = new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateFormat;
}

export default dateFormat;