export const firstChannelId = channels => {
  ("channels", channels)
  const channelIds = Object.values(channels).map(channel => channel.id);
  return Math.min(...channelIds);
};