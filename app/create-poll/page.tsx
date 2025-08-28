export default function RedirectLegacyCreate() {
  if (typeof window !== "undefined") {
    window.location.replace("/polls/create");
  }
  return null;
}
