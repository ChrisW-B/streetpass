import {
  getDisplayHref,
  getRelativeTime,
  getRelMeHrefDataStore,
} from "./util.js";

console.log("This is a popup!");
console.log(document);

const profileList = document.querySelector("#profile-list");

/**
 * @type {import("./util.js").RelMeHrefDataStore | undefined}
 */
let relMeHrefDataStore;
await getRelMeHrefDataStore((innerRelMeHrefDataStore) => {
  relMeHrefDataStore = innerRelMeHrefDataStore;
});

if (relMeHrefDataStore) {
  /**
   * @type {Map<string, { profileData: import("./util.js").ProfileData, websiteUrl: string, viewedAt: number }>}
   */
  const profiles = new Map();

  for (const [relMeHref, relMeHrefData] of new Map(
    Array.from(relMeHrefDataStore.entries()).reverse()
  )) {
    if (relMeHrefData.profileData.type !== "profile") {
      continue;
    }

    const displayProfileUrl = getDisplayHref(
      relMeHrefData.profileData.profileUrl
    );

    const displayWebsiteUrl = getDisplayHref(relMeHrefData.websiteUrl);

    const profileRow = document.createElement("a");
    profileRow.href = relMeHrefData.profileData.profileUrl;
    profileRow.target = "_blank";
    profileRow.style.wordBreak = "break-all";
    profileRow.style.fontSize = "13px";
    profileRow.style.lineHeight = "1.5";
    profileRow.appendChild(document.createTextNode(displayProfileUrl));

    const websiteRow = document.createElement("p");
    const websiteRowAnchor = document.createElement("a");
    websiteRowAnchor.href = relMeHrefData.websiteUrl;
    websiteRowAnchor.target = "_blank";
    websiteRowAnchor.style.color = "inherit";
    websiteRowAnchor.style.wordBreak = "break-all";
    websiteRowAnchor.appendChild(
      document.createTextNode(`${displayWebsiteUrl}`)
    );
    websiteRow.style.fontSize = "13px";
    websiteRow.style.color = "#666";
    websiteRow.style.lineHeight = "1.4";
    websiteRow.appendChild(websiteRowAnchor);

    const urlColumn = document.createElement("div");
    urlColumn.style.display = "flex";
    urlColumn.style.flexDirection = "column";
    urlColumn.style.alignItems = "flex-start";
    urlColumn.appendChild(profileRow);
    urlColumn.appendChild(websiteRow);

    const dateColumn = document.createElement("p");
    dateColumn.style.fontSize = "13px";
    dateColumn.style.width = "74px";
    dateColumn.style.color = "#666";
    profileRow.style.lineHeight = "1.5";
    dateColumn.appendChild(
      document.createTextNode(
        new Intl.DateTimeFormat("en-US", {
          timeStyle: "short",
        }).format(relMeHrefData.viewedAt)
      )
    );

    const profileListItem = document.createElement("div");
    profileListItem.style.display = "flex";
    profileListItem.style.flexDirection = "row";
    profileListItem.style.alignItems = "start";
    profileListItem.appendChild(dateColumn);
    profileListItem.appendChild(urlColumn);
    profileList?.appendChild(profileListItem);
  }
}
