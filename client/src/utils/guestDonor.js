export function createGuestDonor() {
  return {
    id: `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    full_name: "Guest Supporter",
    is_guest: true,
    is_anonymous: true,
  };
}

