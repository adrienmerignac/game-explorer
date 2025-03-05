export const BADGES = {
  "first-review": {
    name: "Budding critic",
    description: "Wrote his first review",
  },
  "wishlist-master": {
    name: "Collector",
    description: "Added 10 games to wishlist",
  },
};

export const checkForNewBadges = (user: any) => {
  const newBadges = [...user.badges];

  if (!user.badges.includes("first-review") && user.reviewsCount >= 1) {
    newBadges.push("first-review");
  }
  if (!user.badges.includes("wishlist-master") && user.wishlist.length >= 10) {
    newBadges.push("wishlist-master");
  }

  return newBadges;
};
