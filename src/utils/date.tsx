export function date(date:Date){
   const newDate=new Date(date)
   return newDate.toLocaleString('en-In',{
      timeZone:'Asia/Kolkata'
   })
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const commentTime = new Date(dateString);
  const diffMs = now.getTime() - commentTime.getTime(); // in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30); // approx
  const years   = Math.floor(days / 365); // approx

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24)   return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7)     return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (weeks < 5)    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  if (months < 12)  return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}